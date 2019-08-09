
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