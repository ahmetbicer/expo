/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#include "ABI39_0_0ScrollViewState.h"

namespace ABI39_0_0facebook {
namespace ABI39_0_0React {

Size ScrollViewState::getContentSize() const {
  return Size{contentBoundingRect.getMaxX(), contentBoundingRect.getMaxY()};
}

} // namespace ABI39_0_0React
} // namespace ABI39_0_0facebook
