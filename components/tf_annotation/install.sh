#!/bin/bash
#
# Copyright (C) 2018 Intel Corporation
#
# SPDX-License-Identifier: MIT
#
set -e

cd ${HOME} && mkdir -p rcnn && \
mv /tmp/frozen_inference_graph.pb ${HOME}/rcnn && cd ${HOME} && \
mv rcnn/frozen_inference_graph.pb rcnn/inference_graph.pb && \
mv /tmp/labels_mapping.json ${HOME}/rcnn

# tensorflow is installed globally
