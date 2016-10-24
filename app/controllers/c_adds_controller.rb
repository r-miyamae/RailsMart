class CAddsController < ApplicationController
  def main
    @user = User.new
  end

  def add
    @user = User.new
    @user.cnum = params[:cnum]
    @user.cname = params[:cname]
    @user.points = 500

    if @user.save
      # -*- encoding: sjis -*-
      require 'rqrcode'
      require 'rqrcode_png'
      require 'chunky_png'

      # 「Hello Wolrd!!」いう文字列、サイズは3、誤り訂正レベルHのQRコードを生成する
      qr = RQRCode::QRCode.new( @user.cnum.to_s , :size => 3, :level => :h )
      png = qr.to_img
      #200×200にリサイズして「hello_world.png」というファイル名で保存する
      png.resize(200, 200).save("#{@user.cname}.png")

      redirect_to cadd_path , notice: "会員登録しました"
    else
      render :main
    end
  end
end
