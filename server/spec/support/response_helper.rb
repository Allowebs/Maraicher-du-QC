module ResponseHelper

  def debug_response(response)
    if response
      if response == []
        puts 'Response is an empty array.'
        return
      end
      puts "Response status = #{response.status}"
      body = JSON.parse(response.body)
      puts "Response body = #{body}"
      if body && body['error']
        puts "Response error = #{body['error']}"
      end
    else
      puts 'Response is nil.'
    end
  end

  def expect_unauthorized_failure(response)
    expect_failure(response, 401, I18n.t('cancan.errors.unauthorized'))
  end

  def expect_message_not_sent_failure(response, recipient)
    expect_failure(response, 500, I18n.t('messages_controller.errors.message_not_sent', recipient: recipient))
  end

  def expect_missing_form_data_failure(response, recipient)
    expect_failure(response, 422, I18n.t('messages_controller.errors.missing_form_data', recipient: recipient))
  end

  def expect_invalid_recipient_failure(response)
    expect_failure(response, 422, I18n.t('messages_controller.errors.invalid_recipient'))
  end

  def expect_record_not_found_failure(response, klass, record_id)
    expect_record_not_found_failure_generic(response, klass, record_id, 404)
  end

  def ownerships(place, authorized)
    {
        'ownerships' => place.ownerships.map { |o|
          json_attributes = {
              'user_id' => o.user_id,
              'name' => o.name,
              'contact_by_phone' => o.contact_by_phone,
              'contact_by_email' => o.contact_by_email
          }
          additional_attributes = {'email' => o.email, 'phone' => o.phone}
          json_attributes = json_attributes.merge(additional_attributes) if authorized
          json_attributes
        }
    }
  end

  private

  def expect_record_not_found_failure_generic(response, klass, record_id, status)
    expect(response.status).to eq(status)
    error = response_error(response)
    expect(error).to start_with("Couldn't find #{klass} with 'id'=#{record_id}")
  end

  def expect_failure(response, status, message)
    expect(response.status).to eq(status)
    error = response_error(response)
    expect(error).to eq(message)
  end

  def response_error(response)
    body = JSON.parse(response.body)
    error = body['errors'] if body.include? 'errors'
    error = body['error'] if body.include? 'error'
    error
  end

end
