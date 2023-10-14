class RemoveColumnNameFromCallCenter < ActiveRecord::Migration[7.0]
  def change
    remove_column :call_centers, :location_type_type, :string
    remove_column :call_centers, :location_type_id, :integer
  end
end
