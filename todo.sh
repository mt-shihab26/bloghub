#!/usr/bin/env bash

grep -rni "todo\|fixme\|hack\|xxx" . --exclude-dir=node_modules --exclude-dir=vendor --exclude-dir=.git
