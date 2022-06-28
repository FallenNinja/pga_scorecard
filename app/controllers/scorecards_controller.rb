class ScorecardsController < ApplicationController

  def index
  end

  # Create Scorecard, send data back to app. See routes.
  def create
    @Scorecard = Scorecard.new({
      courseName: params[:courseName],
      player1: params[:playerOneB],
      player2: params[:playerTwoB]
    })
    @Scorecard.save
    render json: @Scorecard
  end

  # Load a json file containing all existing scorecards. See routes.
  def all_scorecards
    render :json => Scorecard.order("id ASC").as_json
  end

  # Load a json file containing a specifc existing scorecard. See routes.
  def scorecard
    render :json => Scorecard.find_by_id(params[:id]).as_json
  end

  private

end
