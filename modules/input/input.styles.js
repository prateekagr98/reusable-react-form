
import { css, jsx } from '@emotion/core';

import Colors from '../../styles/colors';

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

export let grid_styles = css`
  display: inline-block;
  width: 50%;
  font-size: 12px;
  color: ${Colors.primaryDarkT2};
  padding: 4px 8px;
  font-weight: bold;
`;

export let counter_styles = css`
  text-align: right;
`;

export let error_text_style = css`
  color: ${Colors.secondaryRed};
`;

export let input_error_style = css`
  border-color: ${Colors.secondaryRed};
`;

export let close_icon_style = css`
  position: absolute;
  right: 5px;
  top: 10px;
  font-size: 18px;
  color: ${Colors.primaryDarkT1};
  cursor: pointer;
`;

export let input_container_styles = css`
  position: relative;
`;