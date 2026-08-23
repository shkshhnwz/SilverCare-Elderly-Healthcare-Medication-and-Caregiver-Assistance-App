require('dotenv').config();
const prisma = require('../src/config/prisma');

const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- Starting Care Circle & RBAC Integration Tests ---');

  try {
    // 0. Clean up previous test data if any
    console.log('Cleaning up old test users/circles...');
    await prisma.auditLog.deleteMany({});
    await prisma.consent.deleteMany({});
    await prisma.invitation.deleteMany({});
    await prisma.careCircleMember.deleteMany({});
    await prisma.careCircle.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['alice@example.com', 'bob@example.com', 'charlie@example.com', 'intruder@example.com']
        }
      }
    });

    // 1. Create users and get JWT tokens
    console.log('1. Creating test users (Alice, Bob, Charlie, Intruder)...');
    
    const aliceRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com'
      })
    });
    const aliceData = await aliceRes.json();
    if (!aliceRes.ok) throw new Error(`Alice signup failed: ${JSON.stringify(aliceData)}`);
    const aliceToken = aliceData.token;
    const aliceId = aliceData.user.id;

    const bobRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@example.com'
      })
    });
    const bobData = await bobRes.json();
    if (!bobRes.ok) throw new Error(`Bob signup failed: ${JSON.stringify(bobData)}`);
    const bobToken = bobData.token;
    const bobId = bobData.user.id;

    const charlieRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@example.com'
      })
    });
    const charlieData = await charlieRes.json();
    if (!charlieRes.ok) throw new Error(`Charlie signup failed: ${JSON.stringify(charlieData)}`);
    const charlieToken = charlieData.token;
    const charlieId = charlieData.user.id;

    const intruderRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Intruder',
        lastName: 'X',
        email: 'intruder@example.com'
      })
    });
    const intruderData = await intruderRes.json();
    const intruderToken = intruderData.token;

    console.log('   Users created successfully!');

    // 2. Create Care Circle with Bob as Co-Owner
    console.log('2. Creating Care Circle for Bob with co-ownership enabled...');
    const circle1Res = await fetch(`${BASE_URL}/care-circles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        name: "Bob's Golden Years Circle",
        patientId: bobId,
        patientCoOwn: true
      })
    });
    const circle1 = await circle1Res.json();
    if (!circle1Res.ok) throw new Error(`Failed to create circle: ${JSON.stringify(circle1)}`);
    console.log(`   Circle created: "${circle1.name}" (ID: ${circle1.id})`);

    // Verify Bob and Alice are both owners in memberships
    const members = circle1.memberships;
    const aliceMember = members.find(m => m.userId === aliceId);
    const bobMember = members.find(m => m.userId === bobId);

    if (!aliceMember || aliceMember.role.name !== 'OWNER') {
      throw new Error('Alice (creator) is not an OWNER');
    }
    if (!bobMember || bobMember.role.name !== 'OWNER') {
      throw new Error('Bob (patient) was not auto-added as OWNER co-owner');
    }
    console.log('   Verification passed: Alice and Bob are co-owners!');

    // 3. Create Care Circle without Bob as Co-Owner
    console.log('3. Creating another Care Circle with co-ownership disabled...');
    const circle2Res = await fetch(`${BASE_URL}/care-circles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        name: "Bob's Standard Circle",
        patientId: bobId,
        patientCoOwn: false
      })
    });
    const circle2 = await circle2Res.json();
    if (!circle2Res.ok) throw new Error(`Failed to create circle 2: ${JSON.stringify(circle2)}`);
    const circle2Members = circle2.memberships;
    const bobMember2 = circle2Members.find(m => m.userId === bobId);
    if (bobMember2) {
      throw new Error('Bob was added as a member even when co-ownership was disabled');
    }
    console.log('   Verification passed: Patient not added when co-ownership is disabled.');

    // 4. Invite Charlie to Bob's Golden Years Circle
    console.log("4. Alice (Owner) invites Charlie as CAREGIVER_FULL...");
    const inviteRes = await fetch(`${BASE_URL}/care-circles/${circle1.id}/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aliceToken}`
      },
      body: JSON.stringify({
        roleName: 'CAREGIVER_FULL',
        email: 'charlie@example.com'
      })
    });
    const inviteData = await inviteRes.json();
    if (!inviteRes.ok) throw new Error(`Invitation failed: ${JSON.stringify(inviteData)}`);
    const inviteToken = inviteData.token;
    console.log(`   Invitation created successfully with token.`);

    // 5. Accept invitation
    console.log('5. Charlie accepts invitation...');
    const acceptRes = await fetch(`${BASE_URL}/care-circles/invitations/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${charlieToken}`
      },
      body: JSON.stringify({
        token: inviteToken
      })
    });
    const acceptData = await acceptRes.json();
    if (!acceptRes.ok) throw new Error(`Accept invitation failed: ${JSON.stringify(acceptData)}`);
    console.log(`   Invitation accepted. Charlie joined Circle!`);

    // 6. Test permissions and access
    console.log('6. Checking access rights for different users...');
    
    // Alice (Owner) fetches members - should succeed
    const aliceFetchRes = await fetch(`${BASE_URL}/care-circles/${circle1.id}/members`, {
      headers: { 'Authorization': `Bearer ${aliceToken}` }
    });
    if (!aliceFetchRes.ok) throw new Error('Alice failed to fetch members');

    // Charlie (Caregiver) fetches members - should succeed
    const charlieFetchRes = await fetch(`${BASE_URL}/care-circles/${circle1.id}/members`, {
      headers: { 'Authorization': `Bearer ${charlieToken}` }
    });
    if (!charlieFetchRes.ok) throw new Error('Charlie failed to fetch members');

    // Intruder (Non-member) fetches members - should fail (403)
    const intruderFetchRes = await fetch(`${BASE_URL}/care-circles/${circle1.id}/members`, {
      headers: { 'Authorization': `Bearer ${intruderToken}` }
    });
    if (intruderFetchRes.status !== 403) {
      throw new Error(`Expected intruder to get 403, got ${intruderFetchRes.status}`);
    }
    console.log('   Verification passed: Members check returned 403 for non-member!');

    // 7. Patient Dignity/Consent-First Access Check
    console.log('7. Verifying patient access on a circle they do NOT own (circle2)...');
    // In circle2, patientCoOwn is false. Bob is not a member.
    // However, Bob is the patient subject. He should still be allowed to view members and revoke them.
    const bobFetchCircle2Res = await fetch(`${BASE_URL}/care-circles/${circle2.id}/members`, {
      headers: { 'Authorization': `Bearer ${bobToken}` }
    });
    if (!bobFetchCircle2Res.ok) {
      throw new Error(`Bob (patient) was denied access to view his own circle members: ${bobFetchCircle2Res.status}`);
    }
    console.log('   Verification passed: Patient can see their circle even without a membership!');

    // 8. Revoking a member
    console.log('8. Testing member revocation...');

    // Get Charlie's membership ID from the member list
    const charlieMemberRecord = (await charlieFetchRes.json()).find(m => m.userId === charlieId);
    if (!charlieMemberRecord) throw new Error('Charlie not found in members list');

    // Charlie tries to revoke Alice (should fail)
    const badRevokeRes = await fetch(`${BASE_URL}/care-circles/${circle1.id}/members/${aliceId}/revoke`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${charlieToken}` }
    });
    if (badRevokeRes.status !== 403) {
      throw new Error(`Expected Charlie revoking Alice to get 403, got ${badRevokeRes.status}`);
    }
    console.log('   Verification passed: Normal caregiver cannot revoke owner.');

    // Bob (Patient) revokes Charlie (should succeed - dignity first)
    console.log('   Bob (Patient) revokes Charlie...');
    const revokeRes = await fetch(`${BASE_URL}/care-circles/${circle1.id}/members/${charlieMemberRecord.id}/revoke`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${bobToken}` }
    });
    const revokeData = await revokeRes.json();
    if (!revokeRes.ok) throw new Error(`Bob revoking Charlie failed: ${JSON.stringify(revokeData)}`);
    if (revokeData.status !== 'REVOKED') {
      throw new Error(`Expected membership status to be REVOKED, got ${revokeData.status}`);
    }
    console.log('   Verification passed: Patient successfully revoked caregiver access!');

    // 9. Verify Audit Logs
    console.log('9. Checking Audit Logs in database...');
    const logs = await prisma.auditLog.findMany({
      where: { circleId: circle1.id },
      orderBy: { createdAt: 'asc' }
    });
    
    const actions = logs.map(l => l.action);
    console.log('   Logged actions: ', actions);
    
    if (!actions.includes('INVITE_MEMBER')) throw new Error('Missing INVITE_MEMBER audit log');
    if (!actions.includes('ACCEPT_INVITATION')) throw new Error('Missing ACCEPT_INVITATION audit log');
    if (!actions.includes('REVOKE_MEMBER')) throw new Error('Missing REVOKE_MEMBER audit log');
    console.log('   Verification passed: All actions correctly logged in AuditLog!');

    console.log('\n=========================================');
    console.log('   ALL INTEGRATION TESTS PASSED SUCCESSFULLY!  ');
    console.log('=========================================');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    process.exit(1);
  }
}

runTests();
