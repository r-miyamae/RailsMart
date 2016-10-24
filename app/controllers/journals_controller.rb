class JournalsController < ApplicationController
  def main
    @journal= Journal.all
  end
end
