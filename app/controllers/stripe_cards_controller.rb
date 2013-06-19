class StripeCardsController < ApplicationController

  def index
    render :partial => 'stripe_cards/stripe_cards_list'
  end

  def destroy
    stripe_card = StripeCard.find(params[:id])
    stripe_card.destroy
    render json: stripe_card
  end

end
