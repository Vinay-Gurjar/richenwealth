class CreateStates < ActiveRecord::Migration[7.0]
  def change
    create_table :states do |t|
      t.string :name
      t.string :state_code

      t.timestamps
    end
  end
end
