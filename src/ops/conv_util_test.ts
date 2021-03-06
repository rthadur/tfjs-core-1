/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as conv_util from './conv_util';

describe('conv_util computeConvInfo', () => {
  it('1x1 conv over 1x1 array with same pad', () => {
    const inShape: [number, number, number, number] = [1, 1, 1, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [1, 1, 1, 1], stride, dilation, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(1);
    expect(convInfo.outWidth).toEqual(1);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(1);
    expect(convInfo.effectiveFilterHeight).toEqual(1);
  });

  it('2x2 conv over 3x3 array with same pad', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilation, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
    // Should produce non-even padding with extra pixel at the right/bottom.
    expect(convInfo.padInfo.left).toBe(0);
    expect(convInfo.padInfo.right).toBe(1);
    expect(convInfo.padInfo.top).toBe(0);
    expect(convInfo.padInfo.bottom).toBe(1);
  });

  it('2x2 conv over 3x3 array with same pad', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilation, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });

  it('2x2 conv over 3x3 array with valid pad', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilation, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(2);
    expect(convInfo.outWidth).toEqual(2);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });

  it('3x3 conv over 5x5 array with same pad with stride 2', () => {
    const inShape: [number, number, number, number] = [1, 5, 5, 1];
    const stride = 2;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [3, 3, 1, 1], stride, dilation, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(3);
    expect(convInfo.effectiveFilterHeight).toEqual(3);

    expect(convInfo.padInfo.left).toBe(1);
    expect(convInfo.padInfo.right).toBe(1);
    expect(convInfo.padInfo.top).toBe(1);
    expect(convInfo.padInfo.bottom).toBe(1);
  });

  it('2x2 conv over 3x3 array with valid pad with stride 2', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 2;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilation, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(1);
    expect(convInfo.outWidth).toEqual(1);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });

  it('2x1 conv over 3x3 array with valid pad with stride 1', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 1, 1, 1], stride, dilation, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(2);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(1);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });

  it('2x1 conv over 3x3 array with valid pad with strides h=2, w=1', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const strides: [number, number] = [2, 1];
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 1, 1, 1], strides, dilation, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(1);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(1);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });

  it('1x2 conv over 3x3 array with valid pad with stride 1', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [1, 2, 1, 1], stride, dilation, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(2);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(1);
  });

  it('1x2 conv over 3x3 array with valid pad with stride 1, batch=5', () => {
    const inShape: [number, number, number, number] = [5, 3, 3, 1];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [1, 2, 1, 1], stride, dilation, 'valid');
    expect(convInfo.batchSize).toEqual(5);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(2);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(1);
  });

  it('2x2 conv over 3x3 array with same pad with dilations 2', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilations = 2;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilations, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    // pad evenly on all sides
    expect(convInfo.padInfo.left).toBe(1);
    expect(convInfo.padInfo.right).toBe(1);
    expect(convInfo.padInfo.top).toBe(1);
    expect(convInfo.padInfo.bottom).toBe(1);
    expect(convInfo.effectiveFilterWidth).toEqual(3);
    expect(convInfo.effectiveFilterHeight).toEqual(3);
  });

  it('2x1 conv over 3x3 array with same pad with dilations 2', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilations = 2;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 1, 1, 1], stride, dilations, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    // pad top and bottom
    expect(convInfo.padInfo.left).toBe(0);
    expect(convInfo.padInfo.right).toBe(0);
    expect(convInfo.padInfo.top).toBe(1);
    expect(convInfo.padInfo.bottom).toBe(1);
    expect(convInfo.effectiveFilterWidth).toEqual(1);
    expect(convInfo.effectiveFilterHeight).toEqual(3);
  });

  it('3x4 conv over 8x8 array with same pad with dilations h=4 w=3', () => {
    const inShape: [number, number, number, number] = [1, 8, 8, 1];
    const stride = 1;
    const dilations: [number, number] = [4, 3];
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [3, 4, 1, 1], stride, dilations, 'same');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(8);
    expect(convInfo.outWidth).toEqual(8);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(10);
    expect(convInfo.effectiveFilterHeight).toEqual(9);

    expect(convInfo.padInfo.left).toBe(4);
    expect(convInfo.padInfo.right).toBe(5);
    expect(convInfo.padInfo.top).toBe(4);
    expect(convInfo.padInfo.bottom).toBe(4);
  });

  it('2x1 conv over 3x3 array with valid pad with dilations 2', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilations = 2;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 1, 1, 1], stride, dilations, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(1);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(1);
    expect(convInfo.effectiveFilterHeight).toEqual(3);
  });

  it('2x2 conv over 3x3 array with valid pad with dilations 2', () => {
    const inShape: [number, number, number, number] = [1, 3, 3, 1];
    const stride = 1;
    const dilations = 2;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilations, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(1);
    expect(convInfo.outWidth).toEqual(1);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(3);
    expect(convInfo.effectiveFilterHeight).toEqual(3);
  });

  it('2x2 conv over 4x4 array with valid pad with dilations 2', () => {
    const inShape: [number, number, number, number] = [1, 4, 4, 1];
    const stride = 1;
    const dilations = 2;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, 1, 1], stride, dilations, 'valid');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(2);
    expect(convInfo.outWidth).toEqual(2);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(3);
    expect(convInfo.effectiveFilterHeight).toEqual(3);
  });
});

describe('conv_util computeConv2DInfo with depthwise=true', () => {
  it('1x1 filter over 1x1 array with same pad', () => {
    const inChannels = 1;
    const inShape: [number, number, number, number] = [1, 1, 1, inChannels];
    const fSize = 1;
    const chMul = 1;
    const stride = 1;
    const dilation = 1;
    const pad = 'same';
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad, null,
        true);
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(1);
    expect(convInfo.outWidth).toEqual(1);
    expect(convInfo.outChannels).toEqual(1);
    expect(convInfo.effectiveFilterWidth).toEqual(1);
    expect(convInfo.effectiveFilterHeight).toEqual(1);
  });

  it('2x2 filter over 3x3 array with same pad, chMul=3, depth=2', () => {
    const inChannels = 2;
    const batchSize = 1;
    const inSize = 3;
    const inShape: [number, number, number, number] =
        [batchSize, inSize, inSize, inChannels];
    const fSize = 2;
    const chMul = 3;
    const stride = 1;
    const dilation = 1;
    const pad = 'same';
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad, null,
        true);
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(6);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });

  it('2x2 filter over 3x3 array with valid pad, chMul=3, depth=2', () => {
    const inChannels = 2;
    const batchSize = 1;
    const inSize = 3;
    const inShape: [number, number, number, number] =
        [batchSize, inSize, inSize, inChannels];
    const fSize = 2;
    const chMul = 3;
    const stride = 1;
    const dilation = 1;
    const pad = 'valid';
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad, null,
        true);
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(2);
    expect(convInfo.outWidth).toEqual(2);
    expect(convInfo.outChannels).toEqual(6);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
  });
});

describe('conv_util computeConvInfo channelsFirst', () => {
  it('2x2 conv over 3x3 array with same pad', () => {
    const inDepth = 2;
    const outDepth = 4;
    const inShape: [number, number, number, number] = [1, inDepth, 3, 3];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, inDepth, outDepth], stride, dilation, 'same', null,
        false, 'channelsFirst');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(3);
    expect(convInfo.outWidth).toEqual(3);
    expect(convInfo.outChannels).toEqual(4);
    expect(convInfo.outShape).toEqual([1, 4, 3, 3]);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
    // Should produce non-even padding with extra pixel at the right/bottom.
    expect(convInfo.padInfo.left).toBe(0);
    expect(convInfo.padInfo.right).toBe(1);
    expect(convInfo.padInfo.top).toBe(0);
    expect(convInfo.padInfo.bottom).toBe(1);
  });

  it('2x2 conv over 3x3 array with valid pad', () => {
    const inDepth = 6;
    const outDepth = 16;
    const inShape: [number, number, number, number] = [1, inDepth, 3, 3];
    const stride = 1;
    const dilation = 1;
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [2, 2, inDepth, outDepth], stride, dilation, 'valid', null,
        false, 'channelsFirst');
    expect(convInfo.batchSize).toEqual(1);
    expect(convInfo.outHeight).toEqual(2);
    expect(convInfo.outWidth).toEqual(2);
    expect(convInfo.outChannels).toEqual(16);
    expect(convInfo.outShape).toEqual([1, 16, 2, 2]);
    expect(convInfo.effectiveFilterWidth).toEqual(2);
    expect(convInfo.effectiveFilterHeight).toEqual(2);
    // Should produce no padding.
    expect(convInfo.padInfo.left).toBe(0);
    expect(convInfo.padInfo.right).toBe(0);
    expect(convInfo.padInfo.top).toBe(0);
    expect(convInfo.padInfo.bottom).toBe(0);
  });
});

describe('conv_util computeConvInfo roundingMode', () => {
  const inChannels = 6;
  const batchSize = 1;
  const inSize = 5;
  const inShape: [number, number, number, number] =
      [batchSize, inSize, inSize, inChannels];
  const fSize = 2;
  const chMul = 12;
  const stride = 2;
  const dilation = 1;
  const pad = 1;

  it('should fail computing the output dimension of Conv Layer', () => {
    expect(
        () => conv_util.computeConv2DInfo(
            inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad))
        .toThrowError();
  });

  it('Floor the output dimension of Conv Layer', () => {
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad,
        'floor');

    expect(convInfo.outShape).toEqual([batchSize, 3, 3, chMul]);
  });

  it('Round the output dimension of Conv Layer', () => {
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad,
        'round');

    expect(convInfo.outShape).toEqual([batchSize, 4, 4, chMul]);
  });

  it('Ceil the output dimension of Conv Layer', () => {
    const convInfo = conv_util.computeConv2DInfo(
        inShape, [fSize, fSize, inChannels, chMul], stride, dilation, pad,
        'ceil');

    expect(convInfo.outShape).toEqual([batchSize, 4, 4, chMul]);
  });
});

describe('conv_util computePoolInfo roundingMode', () => {
  const inChannels = 6;
  const batchSize = 1;
  const inSize = 5;
  const inShape: [number, number, number, number] =
      [batchSize, inSize, inSize, inChannels];
  const fSize = 2;
  const stride = 2;
  const dilation = 1;
  const pad = 1;

  it('should fail computing the output dimension of Pool Layer', () => {
    expect(
        () => conv_util.computePool2DInfo(
            inShape, [fSize, fSize], stride, dilation, pad))
        .toThrowError();
  });

  it('Floor the output dimension of Pool Layer', () => {
    const poolInfo = conv_util.computePool2DInfo(
        inShape, [fSize, fSize], stride, pad, dilation, 'floor');

    expect(poolInfo.outShape).toEqual([batchSize, 3, 3, inChannels]);
  });

  it('Round the output dimension of Pool Layer', () => {
    const poolInfo = conv_util.computePool2DInfo(
        inShape, [fSize, fSize], stride, pad, dilation, 'round');

    expect(poolInfo.outShape).toEqual([batchSize, 4, 4, inChannels]);
  });

  it('Ceil the output dimension of Pool Layer', () => {
    const poolInfo = conv_util.computePool2DInfo(
        inShape, [fSize, fSize], stride, pad, dilation, 'ceil');

    expect(poolInfo.outShape).toEqual([batchSize, 4, 4, inChannels]);
  });
});
