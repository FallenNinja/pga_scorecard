Rails.application.routes.draw do
  root "scorecards#index"
  post "scorecards/new", to:'scorecards#create'

  # Loads all (or by id) previous games/scorecards as JSON.
  get "scorecards/all_scorecards"
  get 'scorecards/:id', to:'scorecards#scorecard'
end