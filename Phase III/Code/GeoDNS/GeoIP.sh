#!/bin/bash

# download acl(access control list) online automatically
curl https://geoip.site/download/MaxMind/GeoIP.acl | sed 's/acl \([A-Z][A-Z]\)/acl "\1"/g' > GeoIP.acl

exit 0

