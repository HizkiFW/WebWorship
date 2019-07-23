import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  ControllerPageContainer,
  SectionContainer,
  SectionTitle,
  ListContainer
} from "./style";
import LyricCard from "../../components/LyricCard";
import { showLyric } from "../../actions/lyricAction";
import shortid from "shortid";

class ControllerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songsList: {},
      selectedSong: {},
      selectedSongTitle: "",
      showing: "",
      lyricIndex: 0
    };
  }
  componentDidMount() {
    let test = JSON.parse(localStorage.getItem("state"));
    let songItems = test.lyric.songList;
    this.setState({
      songsList: songItems
    });
    this.selectSong = this.selectSong.bind(this);
    this.renderLyric = this.renderLyric.bind(this);
  }

  selectSong(song) {
    let selectedSong = this.state.songsList[song];
    this.setState({
      selectedSong: selectedSong,
      selectedSongTitle: song
    });
  }

  renderLyric(lyric, index) {
    this.setState({
      showing: lyric,
      lyricIndex: index
    });
    this.props.showLyric(lyric);
  }

  render() {
    return (
      <ControllerPageContainer>
        <SectionContainer>
          <SectionTitle>Song List</SectionTitle>
          <ListContainer>
            {Object.keys(this.state.songsList).map(songTitle => (
              <LyricCard
                text={songTitle}
                key={shortid.generate()}
                onClick={() => this.selectSong(songTitle)}
                active={this.state.selectedSongTitle === songTitle}
              />
            ))}
          </ListContainer>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>
            {this.state.selectedSong.title === undefined
              ? "Song Title"
              : this.state.selectedSong.title}
          </SectionTitle>
          <ListContainer>
            {this.state.selectedSong.lyric === undefined
              ? "Please select song"
              : this.state.selectedSong.lyric.map((lyric, index) => (
                  <LyricCard
                    key={shortid.generate()}
                    onClick={() => this.renderLyric(lyric, index)}
                    text={lyric}
                    active={this.state.lyricIndex === index}
                  />
                ))}
          </ListContainer>
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Active Lyrics</SectionTitle>
          <ListContainer>{this.state.showing.toUpperCase()}</ListContainer>
        </SectionContainer>
      </ControllerPageContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    songs: state.lyric.songList,
    index: state.lyric.currentLyricIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLyric: lyric => dispatch(showLyric(lyric))
  };
}

ControllerPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControllerPage);
