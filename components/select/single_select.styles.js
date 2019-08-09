
import { css, jsx } from '@emotion/core';

import Colors from '../../styles/colors';

export let style_container_styles = css`
  position: relative;
`;

export let input_styles = css`
  display: block;
  font-size: 14px;
  padding: 8px;
  color: ${Colors.primaryDark};
  outline: none;
  border: 2px solid ${Colors.primaryDarkT4};
  border-radius: 6px;
  width: 100%;
  height: 44px;

  &:focus {
    border-color: ${Colors.primaryDarkT2};
  }

  &::placeholder {
    color: ${Colors.primaryDarkT2};
  }
`;

export let dropdown_container_styles = css`
  position: absolute;
  left: 0px;
  width: 100%;
  margin-top: 8px;
  border: 1px solid ${Colors.primaryDarkT4};
  border-radius: 6px;
  max-height: 150px;
  overflow:auto;
  z-index: 1;
  background: white;
`;

export let dropdown_option_styles = css`
  font-size: 14px;
  color: ${Colors.primaryDark};
  padding: 12px;
`;

export let actionable_option_styles = css`
  &:hover {
    background-color: ${Colors.primaryDarkT4};
    cursor: pointer;
  }
`;

export let help_text_styles = css`
  font-size: 12px;
  color: ${Colors.primaryDarkT2};
  padding: 4px 8px;
  font-weight: bold;
`;