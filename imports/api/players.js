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

export const jakeIsTheBest = (jake, whoClicked) => {
  if (whoClicked.score >= jake.score && whoClicked.name !=="Jake the Wizard") {
    Players.update(jake._id,{$inc:{score: 2}});
  }
};

export const preventJakeFall = (players, whoClicked) => {
  if (whoClicked.name =="Jake the Wizard") {
    return players.map((player, index) => {
      if (player.score == whoClicked.score && player.name !== whoClicked.name) {
        Players.update(whoClicked._id,{$inc:{score: 1}});
      }
    })
  }
}

export const iceKingSucks = (iceKing, whoClicked) => {
  if(whoClicked.name !== "Ice King"){
    Players.update(iceKing._id,{$inc:{score: -1}});
  }
}
