# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Generate 18 holes to seed database.
def generate_holes(handicap)
  temp_array = []
  18.times do |i|
    temp_array.push({
      number: i+1,
      gross: rand(1..7),
      allowance: handicap > i ? -1 : 0
    })
  end
  return temp_array
end

# Creates scorecard for 2 players, 18 holes.
Scorecard.create!(
  { courseName: 'PGA Frisco - East Course (Black)',
    player1: {
      name: "Hughie Tiger",
      handicap: 18,
      holes: generate_holes(18)
    }, 
    player2: {
      name: "John Woods",
      handicap: 5,
      holes: generate_holes(5)
    }
  }
)
  
puts "1 completed Scorecard created"