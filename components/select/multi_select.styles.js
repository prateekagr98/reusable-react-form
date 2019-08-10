
import { css, jsx } from '@emotion/core';

import Colors from '../../styles/colors';

export let style_container_styles = css`
  position: relative;
`;

export let select_input_styles = css`
  display: block;
  font-size: 14px;
  padding: 8px;
  color: ${Colors.primaryDark};
  outline: none;
  border: 2px solid ${Colors.primaryDarkT4};
  border-radius: 6px;
  width: 100%;
  height: 44px;
`;

export let input_styles = css`
  display: inline-block;
  font-size: 14px;
  border: 0px;
  background: none;
  padding: 4px;
  outline: none;

  &::placeholder {
    color: ${Colors.primaryDarkT2};
  }
`;

export let selected_option_styles = css`
  position: relative;
  display: inline-block;
  font-size: 14px;
  color: ${Colors.tealColor};
  padding: 4px 12px;
  padding-right: 32px;
  cursor: pointer;
  background-color: ${Colors.tealLightColor};
  margin-right: 8px;
  border-radius: 4px;

  &::after {
    content: 'x';
    padding: 0px 8px;
    position: absolute;
    right: 0px;
    top: 5px;
    font-size: 12px;
    border-left: 1px dotted ${Colors.tealColor};
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    line-height: 18px;
    font-weight: bold;
  }
`;