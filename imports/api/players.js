import {Mongo} from 'meteor/mongo';
import numeral from 'numeral';

export const Players = new Mongo.Collection('players');

export const calculatePlayerPositions = (players) => {
  let rank = 1;
  return players.map((player, index) => {
    if (index !== 0 && players[index-1].score > player.score) {
      rank++;
    };

    return {
      ...player,
      rank,
      position: numeral(rank).format('0o')
    };
  });
};

export const jakeIsTheBest = (jake, players, whoClicked) => {

  if (whoClicked.score >= jake.score && whoClicked.name !=="Jake the Wizard") {
    Players.update(jake._id,{$inc:{score: 2}});
  }

  if (whoClicked.score == jake.score) {
    Players.update(jake._id,{$inc:{score: 1}});
  }

  return 0;

  // return players.map((player, index) => {
  //   if(player._id !== "tEELh7tB7GeeKpy2W") {
  //     if(player.score >= jake.score) {
  //       Players.update(jake._id,{$inc:{score: 1}});
  //     }
  //   }
  // });
};

export const iceKingSucks = (iceKing, whoClicked) => {
  if(whoClicked._id !== "s9v7HW2HoxBjvfbWA"){
    Players.update(iceKing._id,{$inc:{score: -1}});
  }
}
