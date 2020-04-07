#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from pathlib import Path
from http import HTTPStatus

from flask import Blueprint, current_app, jsonify, request
from flask_babel import gettext as _

from reforis.foris_controller_api.utils import log_error, validate_json, APIError

# pylint: disable=invalid-name
blueprint = Blueprint(
    'Netmetr',
    __name__,
    url_prefix='/netmetr/api',
)

BASE_DIR = Path(__file__).parent

# pylint: disable=invalid-name
netmetr = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_netmetr/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/settings', methods=['GET'])
def get_settings():
    return jsonify(current_app.backend.perform('netmetr', 'get_settings'))


@blueprint.route('/settings', methods=['POST'])
def post_settings():
    validate_json(request.json, {'autostart_enabled': bool, 'hours_to_run': list})
    response = current_app.backend.perform('netmetr', 'update_settings', request.json)
    if response.get('result') is not True:
        raise APIError(_('Cannot update netmetr settings.'), HTTPStatus.INTERNAL_SERVER_ERROR)

    return jsonify(response), HTTPStatus.OK


@blueprint.route('/data', methods=['GET'])
def get_data():
    return jsonify(current_app.backend.perform('netmetr', 'get_data'))


@blueprint.route('/trigger-download-data', methods=['POST'])
def trigger_download_data():
    return jsonify(current_app.backend.perform('netmetr', 'download_data')), HTTPStatus.OK


@blueprint.route('/trigger-measure-speed-and-download-data', methods=['POST'])
def trigger_measure_speed_and_download_data():
    return jsonify(current_app.backend.perform('netmetr', 'measure_and_download_data')), HTTPStatus.OK
