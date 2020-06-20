#!/usr/bin/env bash

echo "$TRAVIS_TAG"

if [ -z "$TRAVIS_TAG" ];
then
  echo 'Not tag just build'
  npm run build
else
  echo 'Publish npm package'
  PACKAGE_VERSION=$(echo "${TRAVIS_TAG}" | cut -d "v" -f 2)
  echo "Setting version to ${PACKAGE_VERSION}"
  npm version ${PACKAGE_VERSION}
  npm run build
  npm publish
fi
