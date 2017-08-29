import React from 'react';
import {Players, jakeIsTheBest, preventJakeFall, iceKingSucks} from './../api/players';
import PropTypes from 'prop-types';

export default class Player extends React.Component{

  renderAvatar(){
    if (this.props.player.name =="Jake the Wizard") {
      return <img src="jake.png" alt=""/>
    } else {
      if (this.props.player.name == "Ice King"){
        return <img src="iceking.png" alt=""/>
      } else {
        if (this.props.player.name.length % 2 == 0) {
          return <img src="gunter.png" alt=""/>
        } else {
          return <img src="banana.png" alt=""/>
        }
      }
    }
  }

  renderRemoveButton(){
    if (this.props.player.name == "Jake the Wizard" || this.props.player.name == "Ice King"){
      return <button className="button button--round">--</button>
    } else {
      return <button className="button button--round" onClick={() => {
        Players.remove(this.props.player._id);
      }}>X</button>
    }
  }

  render(){
    let players = Players.find({}, {sort: {score: -1}}).fetch();

    const getClassName = () => {
      if (this.props.player.name == "Jake the Wizard") {
        return `item item--jake item--position-${this.props.player.rank}`
      } else {
        if (this.props.player.name == "Ice King") {
          return `item item--ice-king item--position-${this.props.player.rank}`
        } else {
          return `item item--position-${this.props.player.rank}`
        }
      }
    }
    let itemClassName = getClassName();

    let getJake = Players.find({name: "Jake the Wizard"}).fetch();
    let jake = getJake[0];

    let getIceKing = Players.find({name: "Ice King"}).fetch();
    let iceKing = getIceKing[0];

    return (
      <div key={this.props.player._id} className={itemClassName}>
        <div className="player">
          <div className="player__avatar">
            {this.renderAvatar()}
          </div>
          <div className="player__title">
            <h3 className="player__name">
              {this.props.player.name}
            </h3>
            <p className="player__stats">
              {this.props.player.position} place with {this.props.player.score} point(s).
            </p>
          </div>
          <div className="player__actions">
            <button className="button button--round" onClick={() => {
              Players.update(this.props.player._id,{$inc:{score: -1}});
              jakeIsTheBest(jake, this.props.player);
              preventJakeFall(players, this.props.player)
              iceKingSucks(iceKing, this.props.player);
            }}>-1</button>
            <button className="button button--round" onClick={() => {
              Players.update(this.props.player._id,{$inc:{score: 1}});
              jakeIsTheBest(jake, this.props.player);
              iceKingSucks(iceKing, this.props.player);
            }}>+1</button>
            {this.renderRemoveButton()}
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired
}
