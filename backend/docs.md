### Routes

- /tournaments
  - GET /
  - POST / -> tournament_created
  - GET /:tournament_code
  - DELETE /:tournament_code -> tournament_deleted

  - /players
    - GET /
    - POST / -> player_created
    - GET /:player_code
    - PUT /:player_code -> player_updated
    - DELETE /:player_code -> player_deleted

  - /judges
    - GET /
    - POST / -> judge_created
    - GET /:judge_code
    - PUT /:judge_code -> judge_updated
    - DELETE /:judge_code -> judge_deleted

  - /games
    - GET /
    - POST / -> game_created
    - GET /:game_code
    - PUT /:game_code -> game_updated
    - DELETE /:game_code -> game_deleted