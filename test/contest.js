/* eslint-disable no-undef */
const Contest = artifacts.require("Contest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Contest", function ( accounts ) {

  let contest;

  before(async() => {
    contest = await Contest.deployed();
  });

  //to check if getting initialized correctly
  it("Initializes with two contestants", async () => {
    // return Contest.deployed().then(instance => {
    //   console.log("instance",instance.contestantsCount());
    //   return instance.contestantsCount();
    // }).then(count => {
    //   console.log("count", count);
    //   assert.equal(count, 2);
    // })

    const count = await contest.contestantsCount();
    assert.equal(count, 2);

  });  

  it('Initializes the contestants with correct values', async () => {
  //   return Contest.deployed().then(instance => {
  //     contestInstance = instance;
  //     return contestInstance.contestants(1);
  //   }).then(contestant => {
  //     assert.equal(contestant[0], 1, "contains the correct id");
  //     assert.equal(contestant[1], "Tom", "contains the corrrect name");
  //     assert.equal(contestant[2], 0, "contains the correct votes count");
  //     return contestInstance.contestants(2);
  //   }).then(contestant => {
  //     assert.equal(contestant[0], 2, "contains the correct id");
  //     assert.equal(contestant[1], "Jerry", "contains the corrrect name");
  //     assert.equal(contestant[2], 0, "contains the correct votes count");
  //   })
  // });


  const contestant1 = await contest.contestants(1);
      assert.equal(contestant1[0], 1, "contains the correct id");
      assert.equal(contestant1[1], "Tom", "contains the corrrect name");
      assert.equal(contestant1[2], 0, "contains the correct votes count");

  const contestant2 = await contest.contestants(2);
      assert.equal(contestant2[0], 2, "contains the correct id");
      assert.equal(contestant2[1], "Jerry", "contains the corrrect name");
      assert.equal(contestant2[2], 0, "contains the correct votes count");

  });

  // if addContestant was public
  // it.only("Adds a contestant successfully", async() => {
  //   await contest.addContestant('Abdou');
  //   const con = await contest.contestantsCount();
  //   assert.equal(con, 3, "[message]");
  // })

  it('person can vote if he did not casted his vote yet', async () => {
    await contest.vote(1);
    const contestant1 = await contest.contestants(1)
    assert.equal(contestant1[2], 1, "does not contain the correct vote number");
  });

  it('person can not vote if he already casted his vote', async () => {
    
    try {
      await contest.vote(1);
      await contest.vote(1);
    } catch (error) {
      assert.equal(error.message, "Returned error: VM Exception while processing transaction: revert");
    }


  });

});
