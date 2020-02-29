class CreateCaseFiles < ActiveRecord::Migration[6.0]
  def change
    create_table :case_files do |t|
      t.string :participant_name
      t.text :location

      t.timestamps
    end
  end
end
