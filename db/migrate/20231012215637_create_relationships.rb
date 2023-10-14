class CreateRelationships < ActiveRecord::Migration[7.0]
  def change
    create_table :relationships do |t|
      t.references :mapping, polymorphic: true, null: false
      t.references :with, polymorphic: true, null: false

      t.timestamps
    end
  end
end
