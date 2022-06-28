class Scorecard < ApplicationRecord

    # Keep it simple, small record. Create and update not needed.
    validates :courseName, presence: true
    validates :player1, presence: true
    validates :player2, presence: true

end
