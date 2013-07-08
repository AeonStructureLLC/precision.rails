class Shipment < ActiveRecord::Base
  belongs_to :order
  attr_accessible :order_id, :provider, :tracking_number

  def tracking_url
    case self.provider
      when 'ups'
        return "http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=#{self.tracking_number}"
      when 'usps'
        return "https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=#{self.tracking_number}"
      when 'fedex'
        return "http://www.fedex.com/Tracking?action=track&tracknumbers=#{self.tracking_number}"
      else
        return "http://www.google.com/search?q=#{self.tracking_number}"
    end
  end

end
