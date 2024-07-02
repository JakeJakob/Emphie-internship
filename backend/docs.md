### Routes

- /tournaments
  - GET /
  - GET /:tournament_code
  - POST / -> tournament_created
  - DELETE /:tournament_code -> tournament_deleted

  - /players
    - GET /
    - GET /:player_code
    - POST / -> player_created
    - PUT /:player_code -> player_updated
    - DELETE /:player_code -> player_deleted

  - /judges
    - GET /
    - GET /:judge_code
    - POST / -> judge_created
    - PUT /:judge_code -> judge_updated
    - DELETE /:judge_code -> judge_deleted

  - /games
    - GET /
    - GET /:game_code
    - POST / -> game_created
    - PUT /:game_code -> game_updated
    - DELETE /:game_code -> game_deleted