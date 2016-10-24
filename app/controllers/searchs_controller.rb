class SearchsController < ApplicationController

  def main
    @item = Item.new
  end

  def search
    @item = Item.new
    @item.inum = params[:inum]
    @item.iname = params[:iname]
    @item.price = params[:price]

    @items = Item.all
    @items = Item.where(['inum LIKE ?', "%" + params[:inum] + "%"]) if params[:inum].present?
    @items = Item.where(['iname LIKE ?', "%" + params[:iname] + "%"]) if params[:iname].present?

    render :main
  end

  def info
    @item = Item.find(params[:id])
    @journal = Journal.where(['item_id LIKE ?', "%" + @item.inum.to_s + "%"]) if @item.inum.present?
    @generation = Array.new
    @generation = ["〜19 男性","20代 男性","30代 男性","40代 男性","50〜 男性","〜19 女性","20代 女性","30代 女性","40代 女性","50〜 女性"]
    @array = Array.new(size = 10,obj = 0)
    @cnt = 0
    for journal in @journal do
      for num in 1..10 do
        if journal.generation == num
          @array[num-1] += 1
          @cnt += 1
        end
      end
    end

    i = 0
    data = Array.new{Array.new(2)}
    for i in 0..9 do
      if @array[i] != 0
        data[i] = [@generation[i],@array[i]]
      else
        data[i] = [@generation[i],0]
      end
    end
    @graph = LazyHighCharts::HighChart
    .new('graph') do |f|
      f.title(text: '購入客層')
      f.series(name: '客層',data: data,type: 'pie')
    end
  end

end
