#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus

from reforis.test_utils import mock_backend_response


@mock_backend_response({'netmetr': {'get_settings': {'key': 'value'}}})
def test_get_settings(client):
    response = client.get('/netmetr/api/settings')
    assert response.status_code == HTTPStatus.OK
    assert response.json['key'] == 'value'


@mock_backend_response({'netmetr': {'update_settings': {'result': True}}})
def test_post_settings_invalid_json(client):
    response = client.post('/netmetr/api/settings', json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == 'Invalid JSON'


@mock_backend_response({'example_module': {'example_action': {'key': 'value'}}})
def test_post_settings_backend_error(client):
    response = client.post('/netmetr/api/settings', json={'autostart_enabled': False, 'hours_to_run': []})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == 'Cannot update netmetr settings.'


@mock_backend_response({'netmetr': {'update_settings': {'result': True}}})
def test_post_settings(client):
    response = client.post('/netmetr/api/settings', json={'autostart_enabled': False, 'hours_to_run': []})
    assert response.status_code == HTTPStatus.OK


@mock_backend_response({'netmetr': {'get_data': {'key': 'value'}}})
def test_get_data(client):
    response = client.get('/netmetr/api/data')
    assert response.status_code == HTTPStatus.OK
    assert response.json['key'] == 'value'


@mock_backend_response({'netmetr': {'download_data': {'key': 'value'}}})
def test_post_trigger_download_data(client):
    response = client.post('/netmetr/api/trigger-download-data')
    assert response.status_code == HTTPStatus.OK
    assert response.json['key'] == 'value'


@mock_backend_response({'netmetr': {'measure_and_download_data': {'key': 'value'}}})
def test_post_trigger_measure_speed_and_download_data(client):
    response = client.post('/netmetr/api/trigger-measure-speed-and-download-data')
    assert response.status_code == HTTPStatus.OK
    assert response.json['key'] == 'value'
