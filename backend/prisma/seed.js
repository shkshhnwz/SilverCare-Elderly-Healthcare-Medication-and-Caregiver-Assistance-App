import prisma from "../src/config/prisma";

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
