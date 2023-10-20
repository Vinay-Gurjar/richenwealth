# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

shift_time = [
  { name: "Morning", time: "02:00 AM - 03:00 PM" },
  { name: "After Noon", time: "02:00 PM - 08:00 PM" },
  { name: "Full Day", time: "09:00 AM - 06:00 PM" }
]

ShiftTime.all.destroy_all
shift_time.each do |s|
  st = ShiftTime.new
  st.name = s[:name]
  st.time = s[:time]
  st.save
end

morning_time_arr = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',]
noon_time_arr =  ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']
full_day_time_arr = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM']

ShiftWiseTime.destroy_all
morning_time_arr.each_with_index do |t, i|
  s = ShiftWiseTime.new
  s.time = t
  s.shift_time_id = ShiftTime.find_by(name: "Morning").id
  s.order_id = i + 1
  s.save
end

noon_time_arr.each_with_index do |t, i|
  s = ShiftWiseTime.new
  s.time = t
  s.shift_time_id = ShiftTime.find_by(name: "After Noon").id
  s.order_id = i + 1
  s.save
end

full_day_time_arr.each_with_index do |t, i|
  s = ShiftWiseTime.new
  s.time = t
  s.shift_time_id = ShiftTime.find_by(name: "Full Day").id
  s.order_id = i + 1
  s.save
end

State.create(name: "Delhi", state_code:"DL")
CallCenter.create(name: "Delhi_1", state: State.first)
User.destroy_all
sa = User.create(name: "Super Admin 1", email: "super.admin@saral.tracker", password: "123456",
                 phone_number: "9999223772", call_center: CallCenter.first, shift_time: ShiftTime.first)
admin = User.create(name: "Admin 1", email: "admin@saral.tracker", password: "123456",
                    phone_number: "9971223772", call_center: CallCenter.first, shift_time: ShiftTime.first)

sa.add_role :super_admin
admin.add_role :admin
