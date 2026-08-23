require('dotenv').config();
const prisma = require('../src/config/prisma');

const roles = [
    {
        name: "OWNER",
        description: "Full control over the care circle"
    },
    {
        name: "CAREGIVER_FULL",
        description: "Can manage assigned care activities",
    },
    {
        name: "CAREGIVER_VIEW",
        description: "Read-only family/caregiver access",
    },
    {
        name: "PROFESSIONAL",
        description: "Professional caregiver access",
    },
    {
        name: "PHYSICIAN",
        description: "Physician access",
    },
];
const rolePermissionsMapping = {
    OWNER: [
        "circle:view", "circle:update", "circle:manage_members", "circle:revoke_member",
        "patient:view", "patient:update",
        "vitals:view", "vitals:create",
        "medication:view", "medication:create", "medication:update",
        "task:view", "task:create", "task:complete"
    ],
    CAREGIVER_FULL: [
        "circle:view",
        "patient:view", "patient:update",
        "vitals:view", "vitals:create",
        "medication:view", "medication:create", "medication:update",
        "task:view", "task:create", "task:complete"
    ],
    CAREGIVER_VIEW: [
        "circle:view",
        "patient:view",
        "vitals:view",
        "medication:view",
        "task:view"
    ],
     PROFESSIONAL: [
    "circle:view",
    "vitals:view", "vitals:create",
    "task:view", "task:create", "task:complete"
  ],
  PHYSICIAN: [
    "circle:view",
    "vitals:view", "vitals:create",
    "medication:view", "medication:create", "medication:update",
    "task:view", "task:create", "task:complete"
  ]
}
const permissions = [
    ["circle:view", "View care circle"],
    ["circle:update", "Update care circle"],
    ["circle:manage_members", "Manage circle members"],
    ["circle:revoke_member", "Revoke member access"],

    ["patient:view", "View patient information"],
    ["patient:update", "Update patient information"],

    ["vitals:view", "View patient vitals"],
    ["vitals:create", "Record patient vitals"],

    ["medication:view", "View medications"],
    ["medication:create", "Create medications"],
    ["medication:update", "Update medications"],

    ["task:view", "View care tasks"],
    ["task:create", "Create care tasks"],
    ["task:complete", "Complete care tasks"],
];

async function main() {
    for (const role of roles) {
        await prisma.role.upsert({
            where: {
                name: role.name,
            },
            update: {
                description: role.description,
            },
            create: role
        });
    }
    for (const [key, description] of permissions) {
        await prisma.permission.upsert({
            where: {
                key,
            },
            update: {
                description,
            },
            create: {
                key,
                description,
            },
        });
    }
    for(const[roleName,permissionKeys]of Object.entries(rolePermissionsMapping)){
        const role = await prisma.role.findUnique({
            where:{name:roleName},
        });
        if(!role){
            console.warn(`Warning: Role '${roleName}' not found in database.`);
            continue;
        }
        for(const key of permissionKeys){
            const permission = await prisma.permission.findUnique({
                where:{key},
            });
            if(!permission){
                console.warn(`Warning: Permission '${key}' not found in database.`);
                continue;
            }
            await prisma.rolePermission.upsert({
                where:{
                    roleId_permissionId:{
                        roleId:role.id,
                        permissionId:permission.id,
                    },
                },
                update:{},
                create:{
                    roleId:role.id,
                    permissionId:permission.id,
                },
            });
            console.log(`Assigned permission '${key}' to role '${roleName}'.`);
        }
    }

    console.log("RBAC seed completed.");
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();

    })
