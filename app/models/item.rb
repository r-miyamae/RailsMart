class Item < ActiveRecord::Base

  validates :inum, presence: true, uniqueness: true, length: { is: 4 }, numericality: { only_integer:true }
  validates :iname, presence: true, uniqueness: true
  validates :price, presence: true, length: { maximum: 7 }, numericality: { only_integer: true, greater_than_or_equal_to: 0}
end
