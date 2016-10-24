class CustomersController < ApplicationController
  def main
    @user = User.new
  end

  def search
    @user = User.new
    @user.cnum = params[:inum]
    @user.cname = params[:iname]
    @user.points = params[:points]

    @users = User.all
    @users = User.where(['cnum LIKE ?', "%" + params[:cnum] + "%"]) if params[:cnum].present?
    @users = User.where(['cname LIKE ?', "%" + params[:cname] + "%"]) if params[:cname].present?

      render :main
  end
end
