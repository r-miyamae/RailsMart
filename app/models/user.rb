class User < ActiveRecord::Base
  validates :cnum, presence: true, uniqueness: true, length: { is: 6 }, numericality: { only_integer:true }
  validates :cname, presence: true, uniqueness: true
end
