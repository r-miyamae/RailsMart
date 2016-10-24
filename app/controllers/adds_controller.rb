class AddsController < ApplicationController

  def main
    @item = Item.new
  end

  def add
    @item = Item.new
    @item.inum = params[:inum]
    @item.iname = params[:iname]
    @item.price = params[:price]

    if @item.save
      # -*- encoding: sjis -*-
      require 'rqrcode'
      require 'rqrcode_png'
      require 'chunky_png'

      # 「Hello Wolrd!!」いう文字列、サイズは3、誤り訂正レベルHのQRコードを生成する
      qr = RQRCode::QRCode.new( @item.inum.to_s, :size => 3, :level => :h )
      png = qr.to_img
      #200×200にリサイズして「hello_world.png」というファイル名で保存する
      png.resize(200, 200).save("#{@item.iname}.png")
      
      redirect_to add_path , notice: "商品登録しました"
    else
      render :main
    end
  end
end
