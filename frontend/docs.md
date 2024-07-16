Required pages:
- / -> starting-page
- /tournament/:id/ -> main-panel

Common components:
- CommonDeletePopup:
  - props: title, desc, onSubmit
- CommonShortListCard:
  - props: title, items, overflow_href
- CommonEditDrawer:
  - props: title, desc, children, onSubmit

Specific required components:
- JoinFrom:
  - props: desc, children, submit_text, onSubmit
- TournamentInfoCard:
  - props: name, code
- TournamentActionCard:
  - props: tokenType
- JudgeCodeDrawer:
  - props: judge_name, judge_code, tournament_code