class StripeCardsController < ApplicationController

  def destroy
    stripe_card = StripeCard.find(params[:id])
    stripe_card.destroy
    render json: stripe_card
  end

end
