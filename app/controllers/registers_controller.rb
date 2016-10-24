class RegistersController < ApplicationController
  def main
    require 'json'
    gon.commit = File.open('app/assets/file.json', 'r')
  end

  def ifind
    @del_flag = params[:deletejudge]
    if @del_flag.to_i == 0
      @item = Item.new
      @item = Item.find_by_inum(params[:inum])
      if @item != nil
        require 'json'
        f = File.open('app/assets/file.json', 'a')
        f.puts @item.to_json
        f.close
      end
    elsif @del_flag.to_i != 0
      @item = Item.find_by_inum(params[:inum])
      if @item != nil
        @item.price = -@item.price
        @item.inum = -@item.inum
        f = File.open('app/assets/file.json', 'a')
        f.puts @item.to_json
        f.close
      end
    end
    gon.user = File.open('app/assets/file2.json', 'r')
    gon.commit = File.open('app/assets/file.json', 'r')
    render :main
  end

  def cfind
    @users = User.find_by_cnum(params[:cnum])
    if @users != nil
      f2 = File.open('app/assets/file2.json', 'w')
      f2.puts @users.to_json
      f2.close
      gon.user = File.open('app/assets/file2.json', 'r')
    end
    gon.commit = File.open('app/assets/file.json', 'r')
    render :main
  end


  def commit
    @journal = Journal.new
    @journal.generation = params[:gene]
    gon.commit = File.open('app/assets/file.json', 'r')
    require 'json'
    i = 0
    array = Array.new
    if gon.commit != nil
      commit_sum = 0
      gon.commit.each_line do |line|
        json=JSON.load(line)
        array[i] = json['inum']
        commit_sum += json['price']
        i += 1
      end
      @journal.item_id = array
      @journal.total = commit_sum
    end
    get_points = (commit_sum * 0.01).to_i
    @users = User.find_by_cnum(params[:customer_num])
    if @users != nil
      used_points = params[:redu].to_i
      po = @users.points
      po += used_points
      po += get_points
      @users.points = po
      @users.save
      @journal.customer_id = params[:customer_num]
      @journal.used_points = -used_points
      gon.user = File.open('app/assets/file2.json', 'w')
      gon.user.close
    end
    @journal.generation = params[:gene]
    @journal.save
    gon.commit = File.open('app/assets/file.json', 'w')
    gon.commit.close
    sleep 3
    redirect_to register_main_path
  end
end
