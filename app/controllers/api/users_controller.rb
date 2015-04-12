class Api::UsersController < ApplicationController
  # before_filter :api_require_signed_out, only: [:new, :create]
  # before_filter :require_current_user, only: [:edit, :update, :destroy]

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: {}
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: {}
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def require_current_user
    if !signed_in? || User.find(params[:id]) != current_user
      render json: { error: "only signed in current user may peform this action" }, status: :forbidden
    end
  end
  
end
