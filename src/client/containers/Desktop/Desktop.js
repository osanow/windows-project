import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as menuOptions from '../../utils/contextMenuOptions';
import ContextMenu from '../../components/UI/ContextMenu/contextMenu';
import axios from '../../axios-instance';
import DesktopIcon from '../../components/DesktopIcon/DesktopIcon';
import { updateObject } from '../../utils/utility';
import SystemWindow from '../../components/SystemWindow/systemWindow';
import TextEditor from '../../components/TextEditor/textEditor';

const DesktopWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 3rem);
  overflow: hidden;
  margin: 0;
  padding: 1rem 0.3rem 1rem 0.3rem;

  background: ${({ wallpaperUrl }) => `${
    wallpaperUrl ? `url(${wallpaperUrl})` : ''
  } center center / cover no-repeat
    rgb(51, 102, 255)`};

  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 6rem);
  grid-template-rows: repeat(auto-fill, 4.5rem);
  grid-gap: 0.3rem;
  justify-content: center;
  grid-auto-flow: column;
`;

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.itemRef = {};
  }

  state = {
    wallpaperUrl: '',
    desktopItems: [],
    contextMenu: {
      opened: false,
      options: {},
      data: {},
      left: 0,
      top: 0
    }
  };

  componentDidMount() {
    window.oncontextmenu = this.onContextMenu;
  }

  componentDidUpdate(prevProps) {
    const { isAuth, wallpaper } = this.props;
    let ResItems = null;

    if (prevProps.isAuth !== isAuth) {
      axios('items/', {
        method: 'GET',
        params: {
          path: '/Desktop/'
        }
      })
        .then((res) => {
          ResItems = res.data;
          return import(`../../assets/bgrounds/${wallpaper}`);
        })
        .then((res) => {
          ResItems.forEach((item) => {
            this.itemRef[item._id] = React.createRef();
          });
          this.setState(prevState => updateObject(prevState, {
            wallpaperUrl: res.default,
            desktopItems: ResItems
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  closeContextMenuHandler = () => {
    document.removeEventListener('click', this.closeContextMenuHandler);
    this.setState(prevState => updateObject(prevState, {
      contextMenu: {
        opened: false,
        options: {},
        data: {},
        left: 0,
        top: 0
      }
    }));
  };

  onContextMenu = (e) => {
    const { userId } = this.props;

    const correctTarget = e.path.find(
      val => val.getAttribute('data-type') || val.id === 'app-root'
    );
    if (!correctTarget.getAttribute('data-type')) return false;

    const iconId = correctTarget.id;
    const iconType = correctTarget.getAttribute('data-type').split(',');
    const iconPath = correctTarget.getAttribute('data-path');

    const options = { ...menuOptions[[...iconType]] };

    this.setState(prevState => updateObject(prevState, {
      contextMenu: {
        opened: true,
        left: e.clientX,
        top: e.clientY,
        data: {
          path: iconPath,
          owner: userId,
          id: iconId,
          ref: this.itemRef[iconId]
        },
        options
      }
    }));

    document.addEventListener('click', this.closeContextMenuHandler);
    return false;
  };

  render() {
    const { desktopItems, wallpaperUrl, contextMenu } = this.state;
    return (
      <DesktopWrapper
        wallpaperUrl={wallpaperUrl}
        data-type="desktop"
        data-path="/Desktop/"
      >
        {desktopItems.map(item => <DesktopIcon key={item._id} ref={this.itemRef[item._id]} {...item} />)}
        {contextMenu.opened && <ContextMenu {...contextMenu} />}
        <SystemWindow width="60vw" height="60vh" left="20vw" top="10vh" name="New file" type="file">
          <TextEditor value="Test" />
        </SystemWindow>
      </DesktopWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  userId: state.auth.userId,
  wallpaper: state.auth.preferences.wallpaper
});

export default connect(mapStateToProps)(Desktop);
