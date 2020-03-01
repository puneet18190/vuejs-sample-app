class CaseFilesController < ApplicationController
  def new
  end

  def create
    payload = params[:payload]
    render json: {status: true}
  end

  # def upload_image
  #   payload = params[:payload]
  #   render json: {status: true}
  # end
  def create
    payload = params[:payload]
    render json: {status: true}
  end
end
