class CreateCallCenters < ActiveRecord::Migration[7.0]
  def change
    create_table :call_centers do |t|
      t.string :name
      t.references :state, null: false, foreign_key: true
      t.references :location_type, polymorphic: true, null: false

      t.timestamps
    end
  end
end
