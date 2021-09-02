\echo 'Delete and recreate mando_boutique db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mando_boutique;
CREATE DATABASE mando_boutique;
\connect mando_boutique

\i mando-boutique-schema.sql

\echo 'Delete and recreate mando_boutique_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mando_boutique_test;
CREATE DATABASE mando_boutique_test;
\connect mando_boutique_test

\i mando-boutique-schema.sql