import React, { Component } from 'react';
import { FacebookProvider, MessageUs, CustomChat } from 'react-facebook';

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="1759059694904661" chatSupport>
        <CustomChat pageId="475349145651536" minimized={true} />
      </FacebookProvider>
    );
  }
}