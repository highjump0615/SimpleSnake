#include "jsb_matchvs_manual.hpp"

#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "cocos/scripting/js-bindings/manual/jsb_conversions.hpp"
#include "cocos/scripting/js-bindings/manual/jsb_global.h"

#include "MatchVS.h"

#include <sstream>
#include <string>

using namespace cocos2d;
using namespace matchvs;
using namespace std;

static se::Object *__jsb_MatchVS_SendEventNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_SendEventNotify_class = nullptr;

static bool js_SendEventNotify_finalize(se::State& s)
{
	matchvs::MsSendEventNotify *cobj = (matchvs::MsSendEventNotify *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SendEventNotify_finalize)

static bool js_SendEventNotify_constructor(se::State& s)
{
	matchvs::MsSendEventNotify *cobj = new matchvs::MsSendEventNotify;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SendEventNotify_constructor, __jsb_MatchVS_SendEventNotify_class, js_SendEventNotify_finalize)

static bool js_SendEventNotify_get_srcUserId(se::State& s)
{
	matchvs::MsSendEventNotify* cobj = (matchvs::MsSendEventNotify*)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_SendEventNotify_get_srcUserId)

static bool js_SendEventNotify_set_srcUserId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSendEventNotify* cobj = (matchvs::MsSendEventNotify*)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventNotify_set_srcUserId)

static bool js_SendEventNotif_get_cpProto(se::State& s)
{
	matchvs::MsSendEventNotify* cobj = (matchvs::MsSendEventNotify*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_SendEventNotif_get_cpProto)

static bool js_SendEventNotif_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSendEventNotify* cobj = (matchvs::MsSendEventNotify*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventNotif_set_cpProto)

static bool js_register_matchvs_send_event_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SendEventNotify", ns, nullptr, _SE(js_SendEventNotify_constructor));

	cls->defineProperty("srcUserId", _SE(js_SendEventNotify_get_srcUserId), _SE(js_SendEventNotify_set_srcUserId));
	cls->defineProperty("srcUserID", _SE(js_SendEventNotify_get_srcUserId), _SE(js_SendEventNotify_set_srcUserId));
	cls->defineProperty("cpProto", _SE(js_SendEventNotif_get_cpProto), _SE(js_SendEventNotif_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_SendEventNotify_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsSendEventNotify>(cls);

	__jsb_MatchVS_SendEventNotify_proto = cls->getProto();
	__jsb_MatchVS_SendEventNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_GameServerNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_GameServerNotify_class = nullptr;

static bool js_GameServerNotify_finalize(se::State& s)
{
	matchvs::MsGameServerNotifyInfo *cobj = (matchvs::MsGameServerNotifyInfo *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_GameServerNotify_finalize)

static bool js_GameServerNotify_constructor(se::State& s)
{
	matchvs::MsGameServerNotifyInfo *cobj = new matchvs::MsGameServerNotifyInfo;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_GameServerNotify_constructor, __jsb_MatchVS_GameServerNotify_class, js_GameServerNotify_finalize)

static bool js_GameServerNotify_get_srcUserId(se::State& s)
{
	matchvs::MsGameServerNotifyInfo* cobj = (matchvs::MsGameServerNotifyInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_GameServerNotify_get_srcUserId)

static bool js_GameServerNotify_set_srcUserId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsGameServerNotifyInfo* cobj = (matchvs::MsGameServerNotifyInfo*)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_GameServerNotify_set_srcUserId)

static bool js_GameServerNotify_get_cpProto(se::State& s)
{
	matchvs::MsGameServerNotifyInfo* cobj = (matchvs::MsGameServerNotifyInfo*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_GameServerNotify_get_cpProto)

static bool js_GameServerNotify_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsGameServerNotifyInfo* cobj = (matchvs::MsGameServerNotifyInfo*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_GameServerNotify_set_cpProto)

static bool js_register_matchvs_game_server_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("GameServerNotifyInfo", ns, nullptr, _SE(js_GameServerNotify_constructor));

	cls->defineProperty("srcUserId", _SE(js_GameServerNotify_get_srcUserId), _SE(js_GameServerNotify_set_srcUserId));
	cls->defineProperty("srcUserID", _SE(js_GameServerNotify_get_srcUserId), _SE(js_GameServerNotify_set_srcUserId));
	cls->defineProperty("cpProto", _SE(js_GameServerNotify_get_cpProto), _SE(js_GameServerNotify_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_GameServerNotify_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsGameServerNotifyInfo>(cls);

	__jsb_MatchVS_GameServerNotify_proto = cls->getProto();
	__jsb_MatchVS_GameServerNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_CreateRoomInfo_proto = nullptr;
static se::Class  *__jsb_MatchVS_CreateRoomInfo_class = nullptr;

static bool js_CreateRoomInfo_finalize(se::State& s)
{
	matchvs::MsCreateRoomInfo *createRoomInfo = (matchvs::MsCreateRoomInfo *)s.thisObject()->getPrivateData();
	delete createRoomInfo;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_CreateRoomInfo_finalize)

static bool js_CreateRoomInfo_constructor(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = new matchvs::MsCreateRoomInfo;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_CreateRoomInfo_constructor, __jsb_MatchVS_CreateRoomInfo_class, js_CreateRoomInfo_finalize)

static bool js_CreateRoomInfo_get_name(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
	std::string name(cobj->name.data(), cobj->name.length());
	s.rval().setString(name);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomInfo_get_name)

static bool js_CreateRoomInfo_set_name(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
		cobj->name = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomInfo_set_name)

static bool js_CreateRoomInfo_get_maxPlayer(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomInfo_get_maxPlayer)

static bool js_CreateRoomInfo_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomInfo_set_maxPlayer)

static bool js_CreateRoomInfo_get_mode(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomInfo_get_mode)

static bool js_CreateRoomInfo_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomInfo_set_mode)

static bool js_CreateRoomInfo_get_canWatch(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomInfo_get_canWatch)

static bool js_CreateRoomInfo_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomInfo_set_canWatch)

static bool js_CreateRoomInfo_get_visibility(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
	s.rval().setInt32(cobj->visibility);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomInfo_get_visibility)

static bool js_CreateRoomInfo_set_visibility(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
		cobj->visibility = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomInfo_set_visibility)

static bool js_CreateRoomInfo_get_roomProperty(se::State& s)
{
	matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomInfo_get_roomProperty)

static bool js_CreateRoomInfo_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomInfo *cobj = (matchvs::MsCreateRoomInfo *)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomInfo_set_roomProperty)

static bool js_register_matchvs_create_room_info(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("CreateRoomInfo", ns, nullptr, _SE(js_CreateRoomInfo_constructor));

	cls->defineProperty("name", _SE(js_CreateRoomInfo_get_name), _SE(js_CreateRoomInfo_set_name));
	cls->defineProperty("maxPlayer", _SE(js_CreateRoomInfo_get_maxPlayer), _SE(js_CreateRoomInfo_set_maxPlayer));
	cls->defineProperty("mode", _SE(js_CreateRoomInfo_get_mode), _SE(js_CreateRoomInfo_set_mode));
	cls->defineProperty("canWatch", _SE(js_CreateRoomInfo_get_canWatch), _SE(js_CreateRoomInfo_set_canWatch));
	cls->defineProperty("visibility", _SE(js_CreateRoomInfo_get_visibility), _SE(js_CreateRoomInfo_set_visibility));
	cls->defineProperty("roomProperty", _SE(js_CreateRoomInfo_get_roomProperty), _SE(js_CreateRoomInfo_set_roomProperty));

	cls->defineFinalizeFunction(_SE(js_CreateRoomInfo_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsCreateRoomInfo>(cls);

	__jsb_MatchVS_CreateRoomInfo_proto = cls->getProto();
	__jsb_MatchVS_CreateRoomInfo_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_CreateRoomRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_CreateRoomRsp_class = nullptr;

static bool js_CreateRoomRsp_finalize(se::State& s)
{
	matchvs::MsCreateRoomRsp *createRoomRsp = (matchvs::MsCreateRoomRsp *)s.thisObject()->getPrivateData();
	delete createRoomRsp;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_CreateRoomRsp_finalize)

static bool js_CreateRoomRsp_constructor(se::State& s)
{
	matchvs::MsCreateRoomRsp *cobj = new matchvs::MsCreateRoomRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_CreateRoomRsp_constructor, __jsb_MatchVS_CreateRoomRsp_class, js_CreateRoomRsp_finalize)

static bool js_CreateRoomRsp_get_status(se::State& s)
{
	matchvs::MsCreateRoomRsp *cobj = (matchvs::MsCreateRoomRsp *)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomRsp_get_status)

static bool js_CreateRoomRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomRsp *cobj = (matchvs::MsCreateRoomRsp *)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomRsp_set_status)

static bool js_CreateRoomRsp_get_roomId(se::State& s)
{
	matchvs::MsCreateRoomRsp *cobj = (matchvs::MsCreateRoomRsp *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomID;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomRsp_get_roomId)

static bool js_CreateRoomRsp_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomRsp *cobj = (matchvs::MsCreateRoomRsp *)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->roomID = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomRsp_set_roomId)

static bool js_CreateRoomRsp_get_owner(se::State& s)
{
	matchvs::MsCreateRoomRsp *cobj = (matchvs::MsCreateRoomRsp *)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_CreateRoomRsp_get_owner)

static bool js_CreateRoomRsp_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsCreateRoomRsp *cobj = (matchvs::MsCreateRoomRsp *)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_CreateRoomRsp_set_owner)

static bool js_register_matchvs_create_room_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("CreateRoomRsp", ns, nullptr, _SE(js_CreateRoomRsp_constructor));

	cls->defineProperty("status", _SE(js_CreateRoomRsp_get_status), _SE(js_CreateRoomRsp_set_status));
	cls->defineProperty("roomID", _SE(js_CreateRoomRsp_get_roomId), _SE(js_CreateRoomRsp_set_roomId));
	cls->defineProperty("owner", _SE(js_CreateRoomRsp_get_owner), _SE(js_CreateRoomRsp_set_owner));

	cls->defineFinalizeFunction(_SE(js_CreateRoomRsp_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsCreateRoomRsp>(cls);

	__jsb_MatchVS_CreateRoomRsp_proto = cls->getProto();
	__jsb_MatchVS_CreateRoomRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomFilter_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomFilter_class = nullptr;

static bool js_RoomFilter_finalize(se::State& s)
{
	matchvs::MsRoomFilter *filter = (matchvs::MsRoomFilter *)s.thisObject()->getPrivateData();
	delete filter;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomFilter_finalize)

static bool js_RoomFilter_constructor(se::State& s)
{
	matchvs::MsRoomFilter *cobj = new matchvs::MsRoomFilter;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomFilter_constructor, __jsb_MatchVS_RoomFilter_class, js_RoomFilter_finalize)

static bool js_RoomFilter_get_maxPlayer(se::State& s)
{
	matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilter_get_maxPlayer)

static bool js_RoomFilter_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilter_set_maxPlayer)

static bool js_RoomFilter_get_mode(se::State& s)
{
	matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilter_get_mode)

static bool js_RoomFilter_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilter_set_mode)

static bool js_RoomFilter_get_canWatch(se::State& s)
{
	matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilter_get_canWatch)

static bool js_RoomFilter_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilter_set_canWatch)

static bool js_RoomFilter_get_roomProperty(se::State& s)
{
	matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilter_get_roomProperty)

static bool js_RoomFilter_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomFilter *cobj = (matchvs::MsRoomFilter *)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilter_set_roomProperty)

static bool js_register_matchvs_room_filter(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomFilter", ns, nullptr, _SE(js_RoomFilter_constructor));

	cls->defineProperty("maxPlayer", _SE(js_RoomFilter_get_maxPlayer), _SE(js_RoomFilter_set_maxPlayer));
	cls->defineProperty("mode", _SE(js_RoomFilter_get_mode), _SE(js_RoomFilter_set_mode));
	cls->defineProperty("canWatch", _SE(js_RoomFilter_get_canWatch), _SE(js_RoomFilter_set_canWatch));
	cls->defineProperty("roomProperty", _SE(js_RoomFilter_get_roomProperty), _SE(js_RoomFilter_set_roomProperty));

	cls->defineFinalizeFunction(_SE(js_RoomFilter_finalize));

	cls->install();

	JSBClassType::registerClass<MsRoomFilter>(cls);

	__jsb_MatchVS_RoomFilter_proto = cls->getProto();
	__jsb_MatchVS_RoomFilter_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomFilterEx_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomFilterEx_class = nullptr;

static bool js_RoomFilterEx_finalize(se::State& s)
{
	auto filter = (matchvs::MsRoomFilterEx *)s.thisObject()->getPrivateData();
	delete filter;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomFilterEx_finalize)

static bool js_RoomFilterEx_constructor(se::State& s)
{
	auto cobj = new matchvs::MsRoomFilterEx;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomFilterEx_constructor, __jsb_MatchVS_RoomFilter_class, js_RoomFilterEx_finalize)

static bool js_RoomFilterEx_get_maxPlayer(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_maxPlayer)

static bool js_RoomFilterEx_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_maxPlayer)

static bool js_RoomFilterEx_get_mode(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_mode)

static bool js_RoomFilterEx_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_mode)

static bool js_RoomFilterEx_get_canWatch(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_canWatch)

static bool js_RoomFilterEx_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_canWatch)

static bool js_RoomFilterEx_get_roomProperty(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_roomProperty)

static bool js_RoomFilterEx_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_roomProperty)

static bool js_RoomFilterEx_get_full(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->full);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_full)

static bool js_RoomFilterEx_set_full(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->full = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_full)

static bool js_RoomFilterEx_get_state(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->state);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_state)

static bool js_RoomFilterEx_set_state(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->state = (RoomState)args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_state)

static bool js_RoomFilterEx_get_sort(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->sort);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_sort)

static bool js_RoomFilterEx_set_sort(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->sort = (RoomListSort)args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_sort)

static bool js_RoomFilterEx_get_order(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->order);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_order)

static bool js_RoomFilterEx_set_order(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->order = (SortOrder)args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_order)

static bool js_RoomFilterEx_get_pageNo(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->pageNo);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_pageNo)

static bool js_RoomFilterEx_set_pageNo(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->pageNo = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_pageNo)

static bool js_RoomFilterEx_get_pageSize(se::State& s)
{
	auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->pageSize);
	return true;
}
SE_BIND_PROP_GET(js_RoomFilterEx_get_pageSize)

static bool js_RoomFilterEx_set_pageSize(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomFilterEx *)s.nativeThisObject();
		cobj->pageSize = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomFilterEx_set_pageSize)

static bool js_register_matchvs_room_filter_ex(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomFilterEx", ns, nullptr, _SE(js_RoomFilterEx_constructor));

	cls->defineProperty("maxPlayer", _SE(js_RoomFilterEx_get_maxPlayer), _SE(js_RoomFilterEx_set_maxPlayer));
	cls->defineProperty("mode", _SE(js_RoomFilterEx_get_mode), _SE(js_RoomFilterEx_set_mode));
	cls->defineProperty("canWatch", _SE(js_RoomFilterEx_get_canWatch), _SE(js_RoomFilterEx_set_canWatch));
	cls->defineProperty("roomProperty", _SE(js_RoomFilterEx_get_roomProperty), _SE(js_RoomFilterEx_set_roomProperty));
	cls->defineProperty("full", _SE(js_RoomFilterEx_get_full), _SE(js_RoomFilterEx_set_full));
	cls->defineProperty("state", _SE(js_RoomFilterEx_get_state), _SE(js_RoomFilterEx_set_state));
	cls->defineProperty("sort", _SE(js_RoomFilterEx_get_sort), _SE(js_RoomFilterEx_set_sort));
	cls->defineProperty("order", _SE(js_RoomFilterEx_get_order), _SE(js_RoomFilterEx_set_order));
	cls->defineProperty("pageNo", _SE(js_RoomFilterEx_get_pageNo), _SE(js_RoomFilterEx_set_pageNo));
	cls->defineProperty("pageSize", _SE(js_RoomFilterEx_get_pageSize), _SE(js_RoomFilterEx_set_pageSize));

	cls->defineFinalizeFunction(_SE(js_RoomFilterEx_finalize));

	cls->install();

	JSBClassType::registerClass<MsRoomFilterEx>(cls);

	__jsb_MatchVS_RoomFilterEx_proto = cls->getProto();
	__jsb_MatchVS_RoomFilterEx_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomInfoEx_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomInfoEx_class = nullptr;

static bool js_RoomInfoEx_finalize(se::State& s)
{
	matchvs::MsRoomInfoEx *roomInfoEx = (matchvs::MsRoomInfoEx *)s.thisObject()->getPrivateData();
	delete roomInfoEx;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomInfoEx_finalize)

static bool js_RoomInfoEx_constructor(se::State& s)
{
	matchvs::MsRoomInfoEx *cobj = new matchvs::MsRoomInfoEx;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomInfoEx_constructor, __jsb_MatchVS_RoomInfoEx_class, js_RoomInfoEx_finalize)

static bool js_RoomInfoEx_get_roomId(se::State& s)
{
	matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomID;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_RoomInfoEx_get_roomId)

static bool js_RoomInfoEx_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->roomID = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfoEx_set_roomId)

static bool js_RoomInfoEx_get_roomName(se::State& s)
{
	matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
	std::string roomName(cobj->roomName.data(), cobj->roomName.length());
	s.rval().setString(roomName);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfoEx_get_roomName)

static bool js_RoomInfoEx_set_roomName(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
		cobj->roomName = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfoEx_set_roomName)

static bool js_RoomInfoEx_get_maxPlayer(se::State& s)
{
	matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfoEx_get_maxPlayer)

static bool js_RoomInfoEx_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfoEx_set_maxPlayer)

static bool js_RoomInfoEx_get_mode(se::State& s)
{
	matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfoEx_get_mode)

static bool js_RoomInfoEx_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfoEx_set_mode)

static bool js_RoomInfoEx_get_canWatch(se::State& s)
{
	matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfoEx_get_canWatch)

static bool js_RoomInfoEx_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfoEx *cobj = (matchvs::MsRoomInfoEx *)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfoEx_set_canWatch)

static bool js_RoomInfoEx_get_roomProperty(se::State& s)
{
	matchvs::MsRoomInfoEx* cobj = (matchvs::MsRoomInfoEx*)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfoEx_get_roomProperty)

static bool js_RoomInfoEx_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfoEx* cobj = (matchvs::MsRoomInfoEx*)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfoEx_set_roomProperty)

static bool js_register_matchvs_room_info_ex(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomInfoEx", ns, nullptr, _SE(js_RoomInfoEx_constructor));

	cls->defineProperty("roomID", _SE(js_RoomInfoEx_get_roomId), _SE(js_RoomInfoEx_set_roomId));
	cls->defineProperty("roomName", _SE(js_RoomInfoEx_get_roomName), _SE(js_RoomInfoEx_set_roomName));
	cls->defineProperty("maxPlayer", _SE(js_RoomInfoEx_get_maxPlayer), _SE(js_RoomInfoEx_set_maxPlayer));
	cls->defineProperty("mode", _SE(js_RoomInfoEx_get_mode), _SE(js_RoomInfoEx_set_mode));
	cls->defineProperty("canWatch", _SE(js_RoomInfoEx_get_canWatch), _SE(js_RoomInfoEx_set_canWatch));
	cls->defineProperty("roomProperty", _SE(js_RoomInfoEx_get_roomProperty), _SE(js_RoomInfoEx_set_roomProperty));

	cls->defineFinalizeFunction(_SE(js_RoomInfoEx_finalize));

	cls->install();

	JSBClassType::registerClass<MsRoomInfoEx>(cls);

	__jsb_MatchVS_RoomInfoEx_proto = cls->getProto();
	__jsb_MatchVS_RoomInfoEx_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomAttribute_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomAttribute_class = nullptr;

static bool js_RoomAttribute_finalize(se::State& s)
{
	auto roomInfoEx = (matchvs::MsRoomAttribute *)s.thisObject()->getPrivateData();
	delete roomInfoEx;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomAttribute_finalize)

static bool js_RoomAttribute_constructor(se::State& s)
{
	auto cobj = new matchvs::MsRoomAttribute;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomAttribute_constructor, __jsb_MatchVS_RoomAttribute_class, js_RoomAttribute_finalize)

static bool js_RoomAttribute_get_roomId(se::State& s)
{
	auto cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomId;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_roomId)

static bool js_RoomAttribute_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->roomId = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_roomId)

static bool js_RoomAttribute_get_roomName(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	std::string roomName(cobj->roomName.data(), cobj->roomName.length());
	s.rval().setString(roomName);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_roomName)

static bool js_RoomAttribute_set_roomName(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->roomName = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_roomName)

static bool js_RoomAttribute_get_maxPlayer(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_maxPlayer)

static bool js_RoomAttribute_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_maxPlayer)

static bool js_RoomAttribute_get_gamePlayer(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setUint32(cobj->gamePlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_gamePlayer)

static bool js_RoomAttribute_set_gamePlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->gamePlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_gamePlayer)

static bool js_RoomAttribute_get_watchPlayer(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setUint32(cobj->watchPlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_watchPlayer)

static bool js_RoomAttribute_set_watchPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->watchPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_watchPlayer)

static bool js_RoomAttribute_get_mode(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_mode)

static bool js_RoomAttribute_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_mode)

static bool js_RoomAttribute_get_canWatch(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_canWatch)

static bool js_RoomAttribute_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_canWatch)

static bool js_RoomAttribute_get_roomProperty(se::State& s)
{
	matchvs::MsRoomAttribute* cobj = (matchvs::MsRoomAttribute*)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_roomProperty)

static bool js_RoomAttribute_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute* cobj = (matchvs::MsRoomAttribute*)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_roomProperty)

static bool js_RoomAttribute_get_owner(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_owner)

static bool js_RoomAttribute_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_owner)

static bool js_RoomAttribute_get_state(se::State& s)
{
	matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	s.rval().setInt32(cobj->state);
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_state)

static bool js_RoomAttribute_set_state(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomAttribute *cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		cobj->state = (RoomState)args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_state)

static bool js_RoomAttribute_get_createTime(se::State& s)
{
	auto cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->createTime;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_RoomAttribute_get_createTime)

static bool js_RoomAttribute_set_createTime(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsRoomAttribute *)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->createTime = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomAttribute_set_createTime)

static bool js_register_matchvs_room_attribute(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomAttribute", ns, nullptr, _SE(js_RoomAttribute_constructor));

	cls->defineProperty("roomID", _SE(js_RoomAttribute_get_roomId), _SE(js_RoomAttribute_set_roomId));
	cls->defineProperty("roomName", _SE(js_RoomAttribute_get_roomName), _SE(js_RoomAttribute_set_roomName));
	cls->defineProperty("maxPlayer", _SE(js_RoomAttribute_get_maxPlayer), _SE(js_RoomAttribute_set_maxPlayer));
	cls->defineProperty("gamePlayer", _SE(js_RoomAttribute_get_gamePlayer), _SE(js_RoomAttribute_set_gamePlayer));
	cls->defineProperty("watchPlayer", _SE(js_RoomAttribute_get_watchPlayer), _SE(js_RoomAttribute_set_watchPlayer));
	cls->defineProperty("mode", _SE(js_RoomAttribute_get_mode), _SE(js_RoomAttribute_set_mode));
	cls->defineProperty("canWatch", _SE(js_RoomAttribute_get_canWatch), _SE(js_RoomAttribute_set_canWatch));
	cls->defineProperty("roomProperty", _SE(js_RoomAttribute_get_roomProperty), _SE(js_RoomAttribute_set_roomProperty));
	cls->defineProperty("owner", _SE(js_RoomAttribute_get_owner), _SE(js_RoomAttribute_set_owner));
	cls->defineProperty("state", _SE(js_RoomAttribute_get_state), _SE(js_RoomAttribute_set_state));
	cls->defineProperty("createTime", _SE(js_RoomAttribute_get_createTime), _SE(js_RoomAttribute_set_createTime));

	cls->defineFinalizeFunction(_SE(js_RoomAttribute_finalize));

	cls->install();

	JSBClassType::registerClass<MsRoomAttribute>(cls);

	__jsb_MatchVS_RoomAttribute_proto = cls->getProto();
	__jsb_MatchVS_RoomAttribute_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_GetRoomListExRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_GetRoomListExRsp_class = nullptr;

static bool js_GetRoomListExRsp_finalize(se::State& s)
{
	auto *filter = (matchvs::MsGetRoomListExRsp *)s.thisObject()->getPrivateData();
	delete filter;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_GetRoomListExRsp_finalize)

static bool js_GetRoomListExRsp_constructor(se::State& s)
{
	auto *cobj = new matchvs::MsGetRoomListExRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_GetRoomListExRsp_constructor, __jsb_MatchVS_GetRoomListExRsp_class, js_GetRoomListExRsp_finalize)

static bool js_GetRoomListExRsp_get_status(se::State& s)
{
	auto cobj = (matchvs::MsGetRoomListExRsp *)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_GetRoomListExRsp_get_status)

static bool js_GetRoomListExRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		auto cobj = (matchvs::MsGetRoomListExRsp *)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_GetRoomListExRsp_set_status)

static bool js_GetRoomListExRsp_get_total(se::State& s)
{
	auto cobj = (matchvs::MsGetRoomListExRsp *)s.nativeThisObject();
	s.rval().setInt32(cobj->total);
	return true;
}
SE_BIND_PROP_GET(js_GetRoomListExRsp_get_total)

static bool js_GetRoomListExRsp_set_total(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		auto cobj = (matchvs::MsGetRoomListExRsp *)s.nativeThisObject();
		cobj->total = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_GetRoomListExRsp_set_total)

static bool js_GetRoomListExRsp_get_roomAttrs(se::State& s)
{
	uint32_t index = 0;
	auto cobj = (matchvs::MsGetRoomListExRsp *)s.nativeThisObject();
	auto userInfos = se::Object::createArrayObject(cobj->roomAttrs.size());
	for (auto userInfo : cobj->roomAttrs) {
		auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomAttribute_class);
		auto data = new matchvs::MsRoomAttribute(userInfo);
		obj->setPrivateData(data);

		userInfos->se::Object::setArrayElement(index++, se::Value(obj));
	}
	s.rval().setObject(userInfos);
	return true;
}
SE_BIND_PROP_GET(js_GetRoomListExRsp_get_roomAttrs)

static bool js_register_matchvs_get_room_list_ex_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("GetRoomListExRsp", ns, nullptr, _SE(js_GetRoomListExRsp_constructor));

	cls->defineProperty("status", _SE(js_GetRoomListExRsp_get_status), _SE(js_GetRoomListExRsp_set_status));
	cls->defineProperty("total", _SE(js_GetRoomListExRsp_get_total), _SE(js_GetRoomListExRsp_set_total));
	cls->defineProperty("roomAttrs", _SE(js_GetRoomListExRsp_get_roomAttrs), nullptr);
	
	cls->defineFinalizeFunction(_SE(js_GetRoomListExRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsGetRoomListExRsp>(cls);

	__jsb_MatchVS_GetRoomListExRsp_proto = cls->getProto();
	__jsb_MatchVS_GetRoomListExRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_MatchInfo_proto = nullptr;
static se::Class  *__jsb_MatchVS_MatchInfo_class = nullptr;

static bool js_MatchInfo_finalize(se::State& s)
{
	matchvs::MsMatchInfo *matchInfo = (matchvs::MsMatchInfo *)s.thisObject()->getPrivateData();
	delete matchInfo;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_MatchInfo_finalize)

static bool js_MatchInfo_constructor(se::State& s)
{
	matchvs::MsMatchInfo *cobj = new matchvs::MsMatchInfo;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_MatchInfo_constructor, __jsb_MatchVS_MatchInfo_class, js_MatchInfo_finalize)

static bool js_MatchInfo_get_maxPlayer(se::State& s)
{
	matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_MatchInfo_get_maxPlayer)

static bool js_MatchInfo_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_MatchInfo_set_maxPlayer)

static bool js_MatchInfo_get_mode(se::State& s)
{
	matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_MatchInfo_get_mode)

static bool js_MatchInfo_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_MatchInfo_set_mode)

static bool js_MatchInfo_get_canWatch(se::State& s)
{
	matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_MatchInfo_get_canWatch)

static bool js_MatchInfo_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_MatchInfo_set_canWatch)

static bool js_MatchInfo_get_tags(se::State& s)
{
	matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
	auto tags = se::Object::createArrayObject(cobj->tags.size());
	for (auto tag : cobj->tags) {
		;
	}
	s.rval().setObject(tags);
	return true;
}
SE_BIND_PROP_GET(js_MatchInfo_get_tags)

static bool js_MatchInfo_set_tags(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsMatchInfo *cobj = (matchvs::MsMatchInfo *)s.nativeThisObject();
		std::vector<std::string> keys;
		if (args[0].toObject()->getAllKeys(&keys)) {
			for (std::string key : keys) {
				se::Value value;
				if (args[0].toObject()->getProperty(key.c_str(), &value)) {
					cobj->tags.insert(std::pair<MsString, MsString>(key, value.toString()));
				}
			}
		}
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_MatchInfo_set_tags)

static bool js_register_matchvs_match_info(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("MatchInfo", ns, nullptr, _SE(js_MatchInfo_constructor));

	cls->defineProperty("maxPlayer", _SE(js_MatchInfo_get_maxPlayer), _SE(js_MatchInfo_set_maxPlayer));
	cls->defineProperty("mode", _SE(js_MatchInfo_get_mode), _SE(js_MatchInfo_set_mode));
	cls->defineProperty("canWatch", _SE(js_MatchInfo_get_canWatch), _SE(js_MatchInfo_set_canWatch));
	cls->defineProperty("tags", _SE(js_MatchInfo_get_tags), _SE(js_MatchInfo_set_tags));

	cls->defineFinalizeFunction(_SE(js_MatchInfo_finalize));

	cls->install();

	JSBClassType::registerClass<MsMatchInfo>(cls);

	__jsb_MatchVS_MatchInfo_proto = cls->getProto();
	__jsb_MatchVS_MatchInfo_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_KickPlayerRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_KickPlayerRsp_class = nullptr;

static bool js_KickPlayerRsp_finalize(se::State& s)
{
	matchvs::MsKickPlayerRsp *kickPlayerRsp = (matchvs::MsKickPlayerRsp *)s.thisObject()->getPrivateData();
	delete kickPlayerRsp;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_KickPlayerRsp_finalize)

static bool js_KickPlayerRsp_constructor(se::State& s)
{
	matchvs::MsKickPlayerRsp *cobj = new matchvs::MsKickPlayerRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_KickPlayerRsp_constructor, __jsb_MatchVS_KickPlayerRsp_class, js_KickPlayerRsp_finalize)

static bool js_KickPlayerRsp_get_status(se::State& s)
{
	matchvs::MsKickPlayerRsp *cobj = (matchvs::MsKickPlayerRsp *)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerRsp_get_status)

static bool js_KickPlayerRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsKickPlayerRsp *cobj = (matchvs::MsKickPlayerRsp *)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerRsp_set_status)

static bool js_KickPlayerRsp_get_owner(se::State& s)
{
	matchvs::MsKickPlayerRsp *cobj = (matchvs::MsKickPlayerRsp *)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerRsp_get_owner)

static bool js_KickPlayerRsp_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsKickPlayerRsp *cobj = (matchvs::MsKickPlayerRsp *)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerRsp_set_owner)

static bool js_KickPlayerRsp_get_userId(se::State& s)
{
	matchvs::MsKickPlayerRsp *cobj = (matchvs::MsKickPlayerRsp *)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerRsp_get_userId)

static bool js_KickPlayerRsp_set_userId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsKickPlayerRsp *cobj = (matchvs::MsKickPlayerRsp *)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerRsp_set_userId)

static bool js_register_matchvs_kick_player_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("KickPlayerRsp", ns, nullptr, _SE(js_KickPlayerRsp_constructor));

	cls->defineProperty("status", _SE(js_KickPlayerRsp_get_status), _SE(js_KickPlayerRsp_set_status));
	cls->defineProperty("owner", _SE(js_KickPlayerRsp_get_owner), _SE(js_KickPlayerRsp_set_owner));
	cls->defineProperty("userId", _SE(js_KickPlayerRsp_get_userId), _SE(js_KickPlayerRsp_set_userId));
	cls->defineProperty("userID", _SE(js_KickPlayerRsp_get_userId), _SE(js_KickPlayerRsp_set_userId));
	
	cls->defineFinalizeFunction(_SE(js_KickPlayerRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsKickPlayerRsp>(cls);

	__jsb_MatchVS_KickPlayerRsp_proto = cls->getProto();
	__jsb_MatchVS_KickPlayerRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_KickPlayerNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_KickPlayerNotify_class = nullptr;

static bool js_KickPlayerNotify_finalize(se::State& s)
{
	matchvs::MsKickPlayerNotify *data = (matchvs::MsKickPlayerNotify *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_KickPlayerNotify_finalize)

static bool js_KickPlayerNotify_constructor(se::State& s)
{
	matchvs::MsKickPlayerNotify *cobj = new matchvs::MsKickPlayerNotify;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_KickPlayerNotify_constructor, __jsb_MatchVS_KickPlayerNotify_class, js_KickPlayerNotify_finalize)

static bool js_KickPlayerNotify_get_srcUserId(se::State& s)
{
	matchvs::MsKickPlayerNotify* cobj = (matchvs::MsKickPlayerNotify*)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerNotify_get_srcUserId)

static bool js_KickPlayerNotify_set_srcUserId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsKickPlayerNotify* cobj = (matchvs::MsKickPlayerNotify*)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerNotify_set_srcUserId)

static bool js_KickPlayerNotify_get_userId(se::State& s)
{
	matchvs::MsKickPlayerNotify* cobj = (matchvs::MsKickPlayerNotify*)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerNotify_get_userId)

static bool js_KickPlayerNotify_set_userId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsKickPlayerNotify* cobj = (matchvs::MsKickPlayerNotify*)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerNotify_set_userId)

static bool js_KickPlayerNotify_get_cpProto(se::State& s)
{
	matchvs::MsKickPlayerNotify* cobj = (matchvs::MsKickPlayerNotify*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerNotify_get_cpProto)

static bool js_KickPlayerNotify_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsKickPlayerNotify* cobj = (matchvs::MsKickPlayerNotify*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerNotify_set_cpProto)

static bool js_KickPlayerNotify_get_owner(se::State& s)
{
	matchvs::MsKickPlayerNotify *cobj = (matchvs::MsKickPlayerNotify *)s.nativeThisObject();
	s.rval().setInt32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_KickPlayerNotify_get_owner)

static bool js_KickPlayerNotify_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsKickPlayerNotify *cobj = (matchvs::MsKickPlayerNotify *)s.nativeThisObject();
		cobj->owner = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_KickPlayerNotify_set_owner)

static bool js_register_matchvs_kick_player_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("KickPlayerNotify", ns, nullptr, _SE(js_KickPlayerNotify_constructor));

	cls->defineProperty("srcUserId", _SE(js_KickPlayerNotify_get_srcUserId), _SE(js_KickPlayerNotify_set_srcUserId));
	cls->defineProperty("srcUserID", _SE(js_KickPlayerNotify_get_srcUserId), _SE(js_KickPlayerNotify_set_srcUserId));
	cls->defineProperty("userId", _SE(js_KickPlayerNotify_get_userId), _SE(js_KickPlayerNotify_set_userId));
	cls->defineProperty("userID", _SE(js_KickPlayerNotify_get_userId), _SE(js_KickPlayerNotify_set_userId));
	cls->defineProperty("cpProto", _SE(js_KickPlayerNotify_get_cpProto), _SE(js_KickPlayerNotify_set_cpProto));
	cls->defineProperty("owner", _SE(js_KickPlayerNotify_get_owner), _SE(js_KickPlayerNotify_set_owner));

	cls->defineFinalizeFunction(_SE(js_KickPlayerNotify_finalize));

	cls->install();

	JSBClassType::registerClass<MsKickPlayerNotify>(cls);

	__jsb_MatchVS_KickPlayerNotify_proto = cls->getProto();
	__jsb_MatchVS_KickPlayerNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SubscribeEventGroupRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_SubscribeEventGroupRsp_class = nullptr;

static bool js_SubscribeEventGroupRsp_finalize(se::State& s)
{
	matchvs::MsSubscribeEventGroupRsp *data = (matchvs::MsSubscribeEventGroupRsp *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SubscribeEventGroupRsp_finalize)

static bool js_SubscribeEventGroupRsp_constructor(se::State& s)
{
	matchvs::MsSubscribeEventGroupRsp *cobj = new matchvs::MsSubscribeEventGroupRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SubscribeEventGroupRsp_constructor, __jsb_MatchVS_KickPlayerNotify_class, js_SubscribeEventGroupRsp_finalize)

static bool js_register_matchvs_subscribe_event_group_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SubscribeEventGroupRsp", ns, nullptr, _SE(js_SubscribeEventGroupRsp_constructor));

	//cls->defineProperty("srcUserId", _SE(js_KickPlayerNotify_get_srcUserId), _SE(js_KickPlayerNotify_set_srcUserId));
	//cls->defineProperty("userId", _SE(js_KickPlayerNotify_get_userId), _SE(js_KickPlayerNotify_set_userId));
	//cls->defineProperty("cpProto", _SE(js_KickPlayerNotify_get_cpProto), _SE(js_KickPlayerNotify_set_cpProto));
	//cls->defineProperty("owner", _SE(js_KickPlayerNotify_get_owner), _SE(js_KickPlayerNotify_set_owner));

	cls->defineFinalizeFunction(_SE(js_SubscribeEventGroupRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsSubscribeEventGroupRsp>(cls);

	__jsb_MatchVS_SubscribeEventGroupRsp_proto = cls->getProto();
	__jsb_MatchVS_SubscribeEventGroupRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SendEventGroupRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_SendEventGroupRsp_class = nullptr;

static bool js_SendEventGroupRsp_finalize(se::State& s)
{
	matchvs::MsSendEventGroupRsp *data = (matchvs::MsSendEventGroupRsp *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SendEventGroupRsp_finalize)

static bool js_SendEventGroupRsp_constructor(se::State& s)
{
	matchvs::MsSendEventGroupRsp *cobj = new matchvs::MsSendEventGroupRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SendEventGroupRsp_constructor, __jsb_MatchVS_SendEventGroupRsp_class, js_SendEventGroupRsp_finalize)

static bool js_SendEventGroupRsp_get_status(se::State& s)
{
	matchvs::MsSendEventGroupRsp* cobj = (matchvs::MsSendEventGroupRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_SendEventGroupRsp_get_status)

static bool js_SendEventGroupRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSendEventGroupRsp* cobj = (matchvs::MsSendEventGroupRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventGroupRsp_set_status)

static bool js_SendEventGroupRsp_get_dstNum(se::State& s)
{
	matchvs::MsSendEventGroupRsp* cobj = (matchvs::MsSendEventGroupRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->dstNum);
	return true;
}
SE_BIND_PROP_GET(js_SendEventGroupRsp_get_dstNum)

static bool js_SendEventGroupRsp_set_dstNum(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSendEventGroupRsp* cobj = (matchvs::MsSendEventGroupRsp*)s.nativeThisObject();
		cobj->dstNum = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventGroupRsp_set_dstNum)

static bool js_register_matchvs_send_event_group_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SendEventGroupRsp", ns, nullptr, _SE(js_SendEventGroupRsp_constructor));

	cls->defineProperty("status", _SE(js_SendEventGroupRsp_get_status), _SE(js_SendEventGroupRsp_set_status));
	cls->defineProperty("dstNum", _SE(js_SendEventGroupRsp_get_dstNum), _SE(js_SendEventGroupRsp_set_dstNum));

	cls->defineFinalizeFunction(_SE(js_SendEventGroupRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsSendEventGroupRsp>(cls);

	__jsb_MatchVS_SendEventGroupRsp_proto = cls->getProto();
	__jsb_MatchVS_SendEventGroupRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_NetworkStateNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_NetworkStateNotify_class = nullptr;

static bool js_NetworkStateNotify_finalize(se::State& s)
{
	matchvs::MsNetworkStateNotify *data = (matchvs::MsNetworkStateNotify *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_NetworkStateNotify_finalize)

static bool js_NetworkStateNotify_constructor(se::State& s)
{
	matchvs::MsNetworkStateNotify *cobj = new matchvs::MsNetworkStateNotify;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_NetworkStateNotify_constructor, __jsb_MatchVS_NetworkStateNotify_class, js_NetworkStateNotify_finalize)

static bool js_NetworkStateNotify_get_roomId(se::State& s)
{
	matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
	char buffer[64];
	sprintf(buffer, "%llu", cobj->roomID);
	s.rval().setString(buffer);
	return true;
}
SE_BIND_PROP_GET(js_NetworkStateNotify_get_roomId)

static bool js_NetworkStateNotify_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
		cobj->roomID = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_NetworkStateNotify_set_roomId)

static bool js_NetworkStateNotify_get_userId(se::State& s)
{
	matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_NetworkStateNotify_get_userId)

static bool js_NetworkStateNotify_set_userId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_NetworkStateNotify_set_userId)

static bool js_NetworkStateNotify_get_state(se::State& s)
{
	matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
	s.rval().setInt32(cobj->state);
	return true;
}
SE_BIND_PROP_GET(js_NetworkStateNotify_get_state)

static bool js_NetworkStateNotify_set_state(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
		cobj->state = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_NetworkStateNotify_set_state)

static bool js_NetworkStateNotify_get_owner(se::State& s)
{
	matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_NetworkStateNotify_get_owner)

static bool js_NetworkStateNotify_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsNetworkStateNotify* cobj = (matchvs::MsNetworkStateNotify*)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_NetworkStateNotify_set_owner)

static bool js_register_matchvs_network_state_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("NetworkStateNotify", ns, nullptr, _SE(js_NetworkStateNotify_constructor));

	cls->defineProperty("roomID", _SE(js_NetworkStateNotify_get_roomId), _SE(js_NetworkStateNotify_set_roomId));
	cls->defineProperty("userId", _SE(js_NetworkStateNotify_get_userId), _SE(js_NetworkStateNotify_set_userId));
	cls->defineProperty("userID", _SE(js_NetworkStateNotify_get_userId), _SE(js_NetworkStateNotify_set_userId));
	cls->defineProperty("state", _SE(js_NetworkStateNotify_get_state), _SE(js_NetworkStateNotify_set_state));
	cls->defineProperty("owner", _SE(js_NetworkStateNotify_get_owner), _SE(js_NetworkStateNotify_set_owner));

	cls->defineFinalizeFunction(_SE(js_NetworkStateNotify_finalize));

	cls->install();

	JSBClassType::registerClass<MsNetworkStateNotify>(cls);

	__jsb_MatchVS_NetworkStateNotify_proto = cls->getProto();
	__jsb_MatchVS_NetworkStateNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SetFrameSyncRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_SetFrameSyncRsp_class = nullptr;

static bool js_SetFrameSyncRsp_finalize(se::State& s)
{
	matchvs::MsSetChannelFrameSyncRsp *data = (matchvs::MsSetChannelFrameSyncRsp *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SetFrameSyncRsp_finalize)

static bool js_SetFrameSyncRsp_constructor(se::State& s)
{
	matchvs::MsSetChannelFrameSyncRsp *cobj = new matchvs::MsSetChannelFrameSyncRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SetFrameSyncRsp_constructor, __jsb_MatchVS_SetFrameSyncRsp_class, js_SetFrameSyncRsp_finalize)

static bool js_SetFrameSyncRsp_get_status(se::State& s)
{
	matchvs::MsSetChannelFrameSyncRsp* cobj = (matchvs::MsSetChannelFrameSyncRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_SetFrameSyncRsp_get_status)

static bool js_SetFrameSyncRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSetChannelFrameSyncRsp* cobj = (matchvs::MsSetChannelFrameSyncRsp *)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetFrameSyncRsp_set_status)

static bool js_register_matchvs_set_frame_sync_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SetFrameSyncRsp", ns, nullptr, _SE(js_SetFrameSyncRsp_constructor));

	cls->defineProperty("status", _SE(js_SetFrameSyncRsp_get_status), _SE(js_SetFrameSyncRsp_set_status));

	cls->defineFinalizeFunction(_SE(js_SetFrameSyncRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsSetChannelFrameSyncRsp>(cls);

	__jsb_MatchVS_SetFrameSyncRsp_proto = cls->getProto();
	__jsb_MatchVS_SetFrameSyncRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SendFrameEventRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_SendFrameEventRsp_class = nullptr;

static bool js_SendFrameEventRsp_finalize(se::State& s)
{
	matchvs::MsSendFrameEventRsp *data = (matchvs::MsSendFrameEventRsp *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SendFrameEventRsp_finalize)

static bool js_SendFrameEventRsp_constructor(se::State& s)
{
	matchvs::MsSendFrameEventRsp *cobj = new matchvs::MsSendFrameEventRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SendFrameEventRsp_constructor, __jsb_MatchVS_SendFrameEventRsp_class, js_SendFrameEventRsp_finalize)

static bool js_SendFrameEventRsp_get_status(se::State& s)
{
	matchvs::MsSendFrameEventRsp *cobj = (matchvs::MsSendFrameEventRsp *)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_SendFrameEventRsp_get_status)

static bool js_SendFrameEventRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSendFrameEventRsp* cobj = (matchvs::MsSendFrameEventRsp *)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendFrameEventRsp_set_status)

static bool js_register_matchvs_send_frame_event_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SendFrameEventRsp", ns, nullptr, _SE(js_SendFrameEventRsp_constructor));

	cls->defineProperty("status", _SE(js_SetFrameSyncRsp_get_status), _SE(js_SetFrameSyncRsp_set_status));

	cls->defineFinalizeFunction(_SE(js_SendFrameEventRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsSendFrameEventRsp>(cls);

	__jsb_MatchVS_SendFrameEventRsp_proto = cls->getProto();
	__jsb_MatchVS_SendFrameEventRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_FrameItem_proto = nullptr;
static se::Class  *__jsb_MatchVS_FrameItem_class = nullptr;

static bool js_FrameItem_finalize(se::State& s)
{
	matchvs::MsFrameItem *data = (matchvs::MsFrameItem *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_FrameItem_finalize)

static bool js_FrameItem_constructor(se::State& s)
{
	matchvs::MsFrameItem *cobj = new matchvs::MsFrameItem;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_FrameItem_constructor, __jsb_MatchVS_FrameItem_class, js_FrameItem_finalize)

static bool js_FrameItem_get_srcUserId(se::State& s)
{
	matchvs::MsFrameItem* cobj = (matchvs::MsFrameItem*)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_FrameItem_get_srcUserId)

static bool js_FrameItem_set_srcUserId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsFrameItem* cobj = (matchvs::MsFrameItem*)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_FrameItem_set_srcUserId)

static bool js_FrameItem_get_cpProto(se::State& s)
{
	matchvs::MsFrameItem* cobj = (matchvs::MsFrameItem*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_FrameItem_get_cpProto)

static bool js_FrameItem_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsFrameItem* cobj = (matchvs::MsFrameItem*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_FrameItem_set_cpProto)

static bool js_FrameItem_get_timestamp(se::State& s)
{
	matchvs::MsFrameItem* cobj = (matchvs::MsFrameItem*)s.nativeThisObject();
	char buffer[64];
	sprintf(buffer, "%llu", cobj->timestamp);
	s.rval().setString(buffer);
	return true;
}
SE_BIND_PROP_GET(js_FrameItem_get_timestamp)

static bool js_FrameItem_set_timestamp(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsFrameItem* cobj = (matchvs::MsFrameItem*)s.nativeThisObject();
		cobj->timestamp = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_FrameItem_set_timestamp)

static bool js_register_matchvs_frame_item(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("FrameItem", ns, nullptr, _SE(js_FrameItem_constructor));

	cls->defineProperty("srcUserID", _SE(js_FrameItem_get_srcUserId), _SE(js_FrameItem_set_srcUserId));
	cls->defineProperty("cpProto", _SE(js_FrameItem_get_cpProto), _SE(js_FrameItem_set_cpProto));
	cls->defineProperty("timestamp", _SE(js_FrameItem_get_timestamp), _SE(js_FrameItem_set_timestamp));

	cls->defineFinalizeFunction(_SE(js_FrameItem_finalize));

	cls->install();

	JSBClassType::registerClass<MsFrameItem>(cls);

	__jsb_MatchVS_FrameItem_proto = cls->getProto();
	__jsb_MatchVS_FrameItem_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_FrameData_proto = nullptr;
static se::Class  *__jsb_MatchVS_FrameData_class = nullptr;

static bool js_FrameData_finalize(se::State& s)
{
	auto data = (matchvs::MsFrameData *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_FrameData_finalize)

static bool js_FrameData_constructor(se::State& s)
{
	auto cobj = new matchvs::MsFrameData;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_FrameData_constructor, __jsb_MatchVS_FrameData_class, js_FrameData_finalize)

static bool js_FrameData_get_index(se::State& s)
{
	auto cobj = (MsFrameData *)s.nativeThisObject();
	s.rval().setInt32(cobj->frameIndex);
	return true;
}
SE_BIND_PROP_GET(js_FrameData_get_index)

static bool js_FrameData_set_index(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (MsFrameData *)s.nativeThisObject();
		cobj->frameIndex = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_FrameData_set_index)

static bool js_FrameData_get_count(se::State& s)
{
	auto cobj = (MsFrameData *)s.nativeThisObject();
	s.rval().setInt32(cobj->frameWaitCount);
	return true;
}
SE_BIND_PROP_GET(js_FrameData_get_count)

static bool js_FrameData_set_count(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (MsFrameData *)s.nativeThisObject();
		cobj->frameWaitCount = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_FrameData_set_count)

static bool js_FrameData_get_items(se::State& s)
{
	uint32_t index = 0;
	auto *cobj = (matchvs::MsFrameData *)s.nativeThisObject();
	auto userInfos = se::Object::createArrayObject(cobj->frameItems.size());
	for (auto itemData : cobj->frameItems) {
		auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_FrameItem_class);
		auto *data = new matchvs::MsFrameItem(itemData);
		obj->setPrivateData(data);

		userInfos->se::Object::setArrayElement(index++, se::Value(obj));
	}
	s.rval().setObject(userInfos);
	return true;
}
SE_BIND_PROP_GET(js_FrameData_get_items)

static bool js_register_matchvs_frame_data(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("FrameData", ns, nullptr, _SE(js_FrameData_constructor));

	cls->defineProperty("frameIndex", _SE(js_FrameData_get_index), _SE(js_FrameData_set_index));
	cls->defineProperty("frameWaitCount", _SE(js_FrameData_get_count), _SE(js_FrameData_set_count));
	cls->defineProperty("frameItems", _SE(js_FrameData_get_items), nullptr);

	cls->defineFinalizeFunction(_SE(js_FrameData_finalize));

	cls->install();

	JSBClassType::registerClass<MsFrameData>(cls);

	__jsb_MatchVS_FrameData_proto = cls->getProto();
	__jsb_MatchVS_FrameData_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SendEventResult_proto = nullptr;
static se::Class  *__jsb_MatchVS_SendEventResult_class = nullptr;

class MsSendEventResult
{
public:
	MsSendEventResult()
		: res(0)
		, seq(0)
	{
	}

	int32_t getResult() const { return res; }
	void setResult(int32_t res_) { res = res_; }

	int32_t getSeq() const { return seq; }
	void setSeq(int32_t seq_) { seq = seq_; }

private:
	int32_t res;
	int32_t seq;
};

static bool js_SendEventResult_finalize(se::State& s)
{
	MsSendEventResult *cobj = (MsSendEventResult *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SendEventResult_finalize)

static bool js_SendEventResult_constructor(se::State& s)
{
	MsSendEventResult *cobj = new MsSendEventResult();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SendEventResult_constructor, __jsb_MatchVS_SendEventResult_class, js_SendEventResult_finalize)

static bool js_SendEventResult_get_res(se::State& s)
{
	MsSendEventResult* cobj = (MsSendEventResult*)s.nativeThisObject();
	s.rval().setInt32(cobj->getResult());
	return true;
}
SE_BIND_PROP_GET(js_SendEventResult_get_res)

static bool js_SendEventResult_set_res(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		MsSendEventResult* cobj = (MsSendEventResult*)s.nativeThisObject();
		cobj->setResult(args[0].toInt32());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventResult_set_res)

static bool js_SendEventResult_get_seq(se::State& s)
{
	MsSendEventResult* cobj = (MsSendEventResult*)s.nativeThisObject();
	s.rval().setInt32(cobj->getSeq());
	return true;
}
SE_BIND_PROP_GET(js_SendEventResult_get_seq)

static bool js_SendEventResult_set_seq(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		MsSendEventResult* cobj = (MsSendEventResult*)s.nativeThisObject();
		cobj->setSeq(args[0].toInt32());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventResult_set_seq)

static bool js_register_matchvs_send_event_result(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SendEventResult", ns, nullptr, _SE(js_SendEventResult_constructor));

	cls->defineProperty("result", _SE(js_SendEventResult_get_res), _SE(js_SendEventResult_set_res));
	cls->defineProperty("sequence", _SE(js_SendEventResult_get_seq), _SE(js_SendEventResult_set_seq));

	cls->defineFinalizeFunction(_SE(js_SendEventResult_finalize));

	cls->install();

	JSBClassType::registerClass<MsSendEventResult>(cls);

	__jsb_MatchVS_SendEventResult_proto = cls->getProto();
	__jsb_MatchVS_SendEventResult_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SendEventRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_SendEventRsp_class = nullptr;

static bool js_SendEventRsp_finalize(se::State& s)
{
	matchvs::MsSendEventRsp *cobj = (matchvs::MsSendEventRsp *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SendEventRsp_finalize)

static bool js_SendEventRsp_constructor(se::State& s)
{
	matchvs::MsSendEventRsp *cobj = new matchvs::MsSendEventRsp();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SendEventRsp_constructor, __jsb_MatchVS_SendEventRsp_class, js_SendEventRsp_finalize)

static bool js_SendEventRsp_get_status(se::State& s)
{
	matchvs::MsSendEventRsp* cobj = (matchvs::MsSendEventRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_SendEventRsp_get_status)

static bool js_SendEventRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSendEventRsp* cobj = (matchvs::MsSendEventRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventRsp_set_status)

static bool js_SendEventRsp_get_seq(se::State& s)
{
	matchvs::MsSendEventRsp* cobj = (matchvs::MsSendEventRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->seq);
	return true;
}
SE_BIND_PROP_GET(js_SendEventRsp_get_seq)

static bool js_SendEventRsp_set_seq(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSendEventRsp* cobj = (matchvs::MsSendEventRsp*)s.nativeThisObject();
		cobj->seq = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SendEventRsp_set_seq)

static bool js_register_matchvs_send_event_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SendEventRsp", ns, nullptr, _SE(js_SendEventRsp_constructor));

	cls->defineProperty("status", _SE(js_SendEventRsp_get_status), _SE(js_SendEventRsp_set_status));
	cls->defineProperty("sequence", _SE(js_SendEventRsp_get_seq), _SE(js_SendEventRsp_set_seq));

	cls->defineFinalizeFunction(_SE(js_SendEventRsp_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsSendEventRsp>(cls);

	__jsb_MatchVS_SendEventRsp_proto = cls->getProto();
	__jsb_MatchVS_SendEventRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomInfo_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomInfo_class = nullptr;

static bool js_RoomInfo_finalize(se::State& s)
{
	matchvs::MsRoomInfo *cobj = (matchvs::MsRoomInfo *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomInfo_finalize)

static bool js_RoomInfo_constructor(se::State& s)
{
	matchvs::MsRoomInfo *cobj = new matchvs::MsRoomInfo();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomInfo_constructor, __jsb_MatchVS_RoomInfo_class, js_RoomInfo_finalize)

static bool js_RoomInfo_get_room_id(se::State& s)
{
	matchvs::MsRoomInfo* cobj = (matchvs::MsRoomInfo*)s.nativeThisObject();
	char buffer[64];
	sprintf(buffer, "%llu", cobj->roomID);
	s.rval().setString(buffer);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfo_get_room_id)

static bool js_RoomInfo_set_room_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfo* cobj = (matchvs::MsRoomInfo*)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->roomID = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfo_set_room_id)

static bool js_RoomInfo_get_room_property(se::State& s)
{
	matchvs::MsRoomInfo* cobj = (matchvs::MsRoomInfo*)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.c_str(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfo_get_room_property)

static bool js_RoomInfo_set_room_property(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfo* cobj = (matchvs::MsRoomInfo*)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfo_set_room_property)

static bool js_RoomInfo_get_owner_id(se::State& s)
{
	matchvs::MsRoomInfo* cobj = (matchvs::MsRoomInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_RoomInfo_get_owner_id)

static bool js_RoomInfo_set_owner_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomInfo* cobj = (matchvs::MsRoomInfo*)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomInfo_set_owner_id)

static bool js_register_matchvs_room_info(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomInfo", ns, nullptr, _SE(js_RoomInfo_constructor));

	cls->defineProperty("roomID", _SE(js_RoomInfo_get_room_id), _SE(js_RoomInfo_set_room_id));
	cls->defineProperty("roomProperty", _SE(js_RoomInfo_get_room_property), _SE(js_RoomInfo_set_room_property));
	cls->defineProperty("ownerId", _SE(js_RoomInfo_get_owner_id), _SE(js_RoomInfo_set_owner_id));
	cls->defineProperty("owner", _SE(js_RoomInfo_get_owner_id), _SE(js_RoomInfo_set_owner_id));

	cls->defineFinalizeFunction(_SE(js_RoomInfo_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsRoomInfo>(cls);

	__jsb_MatchVS_RoomInfo_proto = cls->getProto();
	__jsb_MatchVS_RoomInfo_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomUserInfo_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomUserInfo_class = nullptr;

static bool js_RoomUserInfo_finalize(se::State& s)
{
	matchvs::MsRoomUserInfo *cobj = (matchvs::MsRoomUserInfo *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomUserInfo_finalize)

static bool js_RoomUserInfo_constructor(se::State& s)
{
	matchvs::MsRoomUserInfo *cobj = new matchvs::MsRoomUserInfo();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomUserInfo_constructor, __jsb_MatchVS_RoomUserInfo_class, js_RoomUserInfo_finalize)

static bool js_RoomUserInfo_get_id(se::State& s)
{
	matchvs::MsRoomUserInfo* cobj = (matchvs::MsRoomUserInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_RoomUserInfo_get_id)

static bool js_RoomUserInfo_set_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsRoomUserInfo* cobj = (matchvs::MsRoomUserInfo*)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomUserInfo_set_id)

static bool js_RoomUserInfo_get_user_profile(se::State& s)
{
	matchvs::MsRoomUserInfo* cobj = (matchvs::MsRoomUserInfo*)s.nativeThisObject();
	std::string userProfile(cobj->userProfile.c_str(), cobj->userProfile.length());
	s.rval().setString(userProfile);
	return true;
}
SE_BIND_PROP_GET(js_RoomUserInfo_get_user_profile)

static bool js_RoomUserInfo_set_user_profile(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomUserInfo* cobj = (matchvs::MsRoomUserInfo*)s.nativeThisObject();
		cobj->userProfile = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomUserInfo_set_user_profile)

static bool js_register_matchvs_room_user_info(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomUserInfo", ns, nullptr, _SE(js_RoomUserInfo_constructor));

	cls->defineProperty("userId", _SE(js_RoomUserInfo_get_id), _SE(js_RoomUserInfo_set_id));
	cls->defineProperty("userID", _SE(js_RoomUserInfo_get_id), _SE(js_RoomUserInfo_set_id));
	cls->defineProperty("userProfile", _SE(js_RoomUserInfo_get_user_profile), _SE(js_RoomUserInfo_set_user_profile));

	cls->defineFinalizeFunction(_SE(js_RoomUserInfo_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsRoomUserInfo>(cls);

	__jsb_MatchVS_RoomUserInfo_proto = cls->getProto();
	__jsb_MatchVS_RoomUserInfo_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_RoomDetail_proto = nullptr;
static se::Class  *__jsb_MatchVS_RoomDetail_class = nullptr;

static bool js_RoomDetail_finalize(se::State& s)
{
	matchvs::MsGetRoomDetailRsp *matchInfo = (matchvs::MsGetRoomDetailRsp *)s.thisObject()->getPrivateData();
	delete matchInfo;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_RoomDetail_finalize)

static bool js_RoomDetail_constructor(se::State& s)
{
	matchvs::MsGetRoomDetailRsp *cobj = new matchvs::MsGetRoomDetailRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_RoomDetail_constructor, __jsb_MatchVS_RoomDetail_class, js_RoomDetail_finalize)

static bool js_RoomDetail_get_status(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_status)

static bool js_RoomDetail_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_status)

static bool js_RoomDetail_get_state(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->state);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_state)

static bool js_RoomDetail_set_state(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->state = (RoomState)args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_state)

static bool js_RoomDetail_get_maxPlayer(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setUint32(cobj->maxPlayer);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_maxPlayer)

static bool js_RoomDetail_set_maxPlayer(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->maxPlayer = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_maxPlayer)

static bool js_RoomDetail_get_mode(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->mode);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_mode)

static bool js_RoomDetail_set_mode(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->mode = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_mode)

static bool js_RoomDetail_get_canWatch(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->canWatch);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_canWatch)

static bool js_RoomDetail_set_canWatch(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->canWatch = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_canWatch)

static bool js_RoomDetail_get_roomProperty(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_roomProperty)

static bool js_RoomDetail_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_roomProperty)

static bool js_RoomDetail_get_owner(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_owner)

static bool js_RoomDetail_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_owner)

static bool js_RoomDetail_get_createFlag(se::State& s)
{
	matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
	s.rval().setUint32(cobj->createFlag);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_createFlag)

static bool js_RoomDetail_set_createFlag(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsGetRoomDetailRsp* cobj = (matchvs::MsGetRoomDetailRsp*)s.nativeThisObject();
		cobj->createFlag = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_RoomDetail_set_createFlag)

static bool js_RoomDetail_get_userInfos(se::State& s)
{
	uint32_t index = 0;
	matchvs::MsGetRoomDetailRsp *cobj = (matchvs::MsGetRoomDetailRsp *)s.nativeThisObject();
	auto userInfos = se::Object::createArrayObject(cobj->userInfos.size());
	for (auto userInfo : cobj->userInfos) {
		auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomUserInfo_class);
		matchvs::MsRoomUserInfo *data = new matchvs::MsRoomUserInfo(userInfo);
		obj->setPrivateData(data);

		userInfos->se::Object::setArrayElement(index++, se::Value(obj));
	}
	s.rval().setObject(userInfos);
	return true;
}
SE_BIND_PROP_GET(js_RoomDetail_get_userInfos)

static bool js_register_matchvs_room_detail(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("RoomDetailRsp", ns, nullptr, _SE(js_RoomDetail_constructor));

	cls->defineProperty("status", _SE(js_RoomDetail_get_status), _SE(js_RoomDetail_set_status));
	cls->defineProperty("state", _SE(js_RoomDetail_get_state), _SE(js_RoomDetail_set_state));
	cls->defineProperty("maxPlayer", _SE(js_RoomDetail_get_maxPlayer), _SE(js_RoomDetail_set_maxPlayer));
	cls->defineProperty("mode", _SE(js_RoomDetail_get_mode), _SE(js_RoomDetail_set_mode));
	cls->defineProperty("canWatch", _SE(js_RoomDetail_get_canWatch), _SE(js_RoomDetail_set_canWatch));
	cls->defineProperty("roomProperty", _SE(js_RoomDetail_get_roomProperty), _SE(js_RoomDetail_set_roomProperty));
	cls->defineProperty("owner", _SE(js_RoomDetail_get_owner), _SE(js_RoomDetail_set_owner));
	cls->defineProperty("createFlag", _SE(js_RoomDetail_get_createFlag), _SE(js_RoomDetail_set_createFlag));
	cls->defineProperty("userInfos", _SE(js_RoomDetail_get_userInfos), nullptr);

	cls->defineFinalizeFunction(_SE(js_RoomDetail_finalize));

	cls->install();

	JSBClassType::registerClass<MsGetRoomDetailRsp>(cls);

	__jsb_MatchVS_RoomDetail_proto = cls->getProto();
	__jsb_MatchVS_RoomDetail_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SetRoomPropertiesRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_SetRoomPropertiesRsp_class = nullptr;

static bool js_SetRoomPropertiesRsp_finalize(se::State& s)
{
	matchvs::MsSetRoomPropertiesRsp *data = (matchvs::MsSetRoomPropertiesRsp *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SetRoomPropertiesRsp_finalize)

static bool js_SetRoomPropertiesRsp_constructor(se::State& s)
{
	matchvs::MsSetRoomPropertiesRsp *cobj = new matchvs::MsSetRoomPropertiesRsp;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SetRoomPropertiesRsp_constructor, __jsb_MatchVS_SetRoomPropertiesRsp_class, js_SetRoomPropertiesRsp_finalize)

static bool js_SetRoomPropertiesRsp_get_status(se::State& s)
{
	matchvs::MsSetRoomPropertiesRsp* cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesRsp_get_status)

static bool js_SetRoomPropertiesRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSetRoomPropertiesRsp* cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesRsp_set_status)

static bool js_SetRoomPropertiesRsp_get_room_id(se::State& s)
{
	matchvs::MsSetRoomPropertiesRsp *cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomID;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesRsp_get_room_id)

static bool js_SetRoomPropertiesRsp_set_room_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSetRoomPropertiesRsp *cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->roomID = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesRsp_set_room_id)

static bool js_SetRoomPropertiesRsp_get_id(se::State& s)
{
	matchvs::MsSetRoomPropertiesRsp *cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesRsp_get_id)

static bool js_SetRoomPropertiesRsp_set_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSetRoomPropertiesRsp *cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesRsp_set_id)

static bool js_SetRoomPropertiesRsp_get_roomProperty(se::State& s)
{
	matchvs::MsSetRoomPropertiesRsp *cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesRsp_get_roomProperty)

static bool js_SetRoomPropertiesRsp_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSetRoomPropertiesRsp *cobj = (matchvs::MsSetRoomPropertiesRsp *)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesRsp_set_roomProperty)

static bool js_register_matchvs_set_room_properties_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SetRoomPropertiesRsp", ns, nullptr, _SE(js_SetRoomPropertiesRsp_constructor));

	cls->defineProperty("status", _SE(js_SetRoomPropertiesRsp_get_status), _SE(js_SetRoomPropertiesRsp_set_status));
	cls->defineProperty("roomID", _SE(js_SetRoomPropertiesRsp_get_room_id), _SE(js_SetRoomPropertiesRsp_set_room_id));
	cls->defineProperty("userID", _SE(js_SetRoomPropertiesRsp_get_id), _SE(js_SetRoomPropertiesRsp_set_id));
	cls->defineProperty("roomProperty", _SE(js_SetRoomPropertiesRsp_get_roomProperty), _SE(js_SetRoomPropertiesRsp_set_roomProperty));

	cls->defineFinalizeFunction(_SE(js_SetRoomPropertiesRsp_finalize));

	cls->install();

	JSBClassType::registerClass<MsSetRoomPropertiesRsp>(cls);

	__jsb_MatchVS_SetRoomPropertiesRsp_proto = cls->getProto();
	__jsb_MatchVS_SetRoomPropertiesRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_SetRoomPropertiesNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_SetRoomPropertiesNotify_class = nullptr;

static bool js_SetRoomPropertiesNotify_finalize(se::State& s)
{
	matchvs::MsSetRoomPropertiesNotify *data = (matchvs::MsSetRoomPropertiesNotify *)s.thisObject()->getPrivateData();
	delete data;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_SetRoomPropertiesNotify_finalize)

static bool js_SetRoomPropertiesNotify_constructor(se::State& s)
{
	matchvs::MsSetRoomPropertiesNotify *cobj = new matchvs::MsSetRoomPropertiesNotify;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_SetRoomPropertiesNotify_constructor, __jsb_MatchVS_SetRoomPropertiesNotify_class, js_SetRoomPropertiesNotify_finalize)

static bool js_SetRoomPropertiesNotify_get_room_id(se::State& s)
{
	matchvs::MsSetRoomPropertiesNotify *cobj = (matchvs::MsSetRoomPropertiesNotify *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomID;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesNotify_get_room_id)

static bool js_SetRoomPropertiesNotify_set_room_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsSetRoomPropertiesNotify *cobj = (matchvs::MsSetRoomPropertiesNotify *)s.nativeThisObject();
		std::string roomId = args[0].toString();
		cobj->roomID = atoll(roomId.c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesNotify_set_room_id)

static bool js_SetRoomPropertiesNotify_get_id(se::State& s)
{
	matchvs::MsSetRoomPropertiesNotify *cobj = (matchvs::MsSetRoomPropertiesNotify *)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesNotify_get_id)

static bool js_SetRoomPropertiesNotify_set_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSetRoomPropertiesNotify *cobj = (matchvs::MsSetRoomPropertiesNotify *)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesNotify_set_id)

static bool js_SetRoomPropertiesNotify_get_roomProperty(se::State& s)
{
	matchvs::MsSetRoomPropertiesNotify *cobj = (matchvs::MsSetRoomPropertiesNotify *)s.nativeThisObject();
	std::string roomProperty(cobj->roomProperty.data(), cobj->roomProperty.length());
	s.rval().setString(roomProperty);
	return true;
}
SE_BIND_PROP_GET(js_SetRoomPropertiesNotify_get_roomProperty)

static bool js_SetRoomPropertiesNotify_set_roomProperty(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsSetRoomPropertiesNotify *cobj = (matchvs::MsSetRoomPropertiesNotify *)s.nativeThisObject();
		cobj->roomProperty = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_SetRoomPropertiesNotify_set_roomProperty)

static bool js_register_matchvs_set_room_properties_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("SetRoomPropertiesNotify", ns, nullptr, _SE(js_SetRoomPropertiesNotify_constructor));

	cls->defineProperty("roomID", _SE(js_SetRoomPropertiesNotify_get_room_id), _SE(js_SetRoomPropertiesNotify_set_room_id));
	cls->defineProperty("userID", _SE(js_SetRoomPropertiesNotify_get_id), _SE(js_SetRoomPropertiesNotify_set_id));
	cls->defineProperty("roomProperty", _SE(js_SetRoomPropertiesNotify_get_roomProperty), _SE(js_SetRoomPropertiesNotify_set_roomProperty));

	cls->defineFinalizeFunction(_SE(js_SetRoomPropertiesNotify_finalize));

	cls->install();

	JSBClassType::registerClass<MsSetRoomPropertiesNotify>(cls);

	__jsb_MatchVS_SetRoomPropertiesNotify_proto = cls->getProto();
	__jsb_MatchVS_SetRoomPropertiesNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_UserInfo_proto = nullptr;
static se::Class  *__jsb_MatchVS_UserInfo_class = nullptr;

static bool js_UserInfo_finalize(se::State& s)
{
	matchvs::MsUserInfo *cobj = (matchvs::MsUserInfo *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_UserInfo_finalize)

static bool js_UserInfo_constructor(se::State& s)
{
	matchvs::MsUserInfo *cobj = new matchvs::MsUserInfo();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_UserInfo_constructor, __jsb_MatchVS_UserInfo_class, js_UserInfo_finalize)

static bool js_UserInfo_get_status(se::State& s)
{
	matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_UserInfo_get_status)

static bool js_UserInfo_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_UserInfo_set_status)

static bool js_UserInfo_get_id(se::State& s)
{
	matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_UserInfo_get_id)

static bool js_UserInfo_set_id(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc > 0) {
		matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_UserInfo_set_id)

static bool js_UserInfo_get_userProfile(se::State& s)
{
	matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
	std::string token(cobj->token.c_str(), cobj->token.length());
	s.rval().setString(token);
	return true;
}
SE_BIND_PROP_GET(js_UserInfo_get_userProfile)

static bool js_UserInfo_set_userProfile(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
		cobj->token = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_UserInfo_set_userProfile)

static bool js_UserInfo_get_name(se::State& s)
{
	matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
	s.rval().setString(cobj->name.c_str());
	return true;
}
SE_BIND_PROP_GET(js_UserInfo_get_name)

static bool js_UserInfo_set_name(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
		cobj->name = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_UserInfo_set_name)

static bool js_UserInfo_get_avatar(se::State& s)
{
	matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
	s.rval().setString(cobj->avatar.c_str());
	return true;
}
SE_BIND_PROP_GET(js_UserInfo_get_avatar)

static bool js_UserInfo_set_avatar(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsUserInfo* cobj = (matchvs::MsUserInfo*)s.nativeThisObject();
		cobj->avatar = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_UserInfo_set_avatar)

static bool js_register_matchvs_user_info(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("UserInfo", ns, nullptr, _SE(js_UserInfo_constructor));

	cls->defineProperty("status", _SE(js_UserInfo_get_status), _SE(js_UserInfo_set_status));
	cls->defineProperty("id", _SE(js_UserInfo_get_id), _SE(js_UserInfo_set_id));
	cls->defineProperty("userID", _SE(js_UserInfo_get_id), _SE(js_UserInfo_set_id));
	cls->defineProperty("token", _SE(js_UserInfo_get_userProfile), _SE(js_UserInfo_set_userProfile));
	cls->defineProperty("name", _SE(js_UserInfo_get_name), _SE(js_UserInfo_set_name));
	cls->defineProperty("avatar", _SE(js_UserInfo_get_avatar), _SE(js_UserInfo_set_avatar));
	
	cls->defineFinalizeFunction(_SE(js_UserInfo_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsUserInfo>(cls);

	__jsb_MatchVS_UserInfo_proto = cls->getProto();
	__jsb_MatchVS_UserInfo_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_LoginRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_LoginRsp_class = nullptr;

static bool js_LoginRsp_finalize(se::State& s)
{
	matchvs::MsLoginRsp *cobj = (matchvs::MsLoginRsp *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_LoginRsp_finalize)

static bool js_LoginRsp_constructor(se::State& s)
{
	matchvs::MsLoginRsp *cobj = new matchvs::MsLoginRsp();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_LoginRsp_constructor, __jsb_MatchVS_LoginRsp_class, js_LoginRsp_finalize)

static bool js_LoginRsp_get_status(se::State& s)
{
	matchvs::MsLoginRsp* cobj = (matchvs::MsLoginRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_LoginRsp_get_status)

static bool js_LoginRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsLoginRsp* cobj = (matchvs::MsLoginRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LoginRsp_set_status)

static bool js_LoginRsp_get_roomId(se::State& s)
{
	matchvs::MsLoginRsp* cobj = (matchvs::MsLoginRsp*)s.nativeThisObject();
	char buffer[64];
	sprintf(buffer, "%llu", cobj->roomID);
	s.rval().setString(buffer);
	return true;
}
SE_BIND_PROP_GET(js_LoginRsp_get_roomId)

static bool js_LoginRsp_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsLoginRsp* cobj = (matchvs::MsLoginRsp*)s.nativeThisObject();
		cobj->roomID = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LoginRsp_set_roomId)

static bool js_register_matchvs_login_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("LoginRsp", ns, nullptr, _SE(js_UserInfo_constructor));

	cls->defineProperty("status", _SE(js_LoginRsp_get_status), _SE(js_LoginRsp_set_status));
	cls->defineProperty("roomID", _SE(js_LoginRsp_get_roomId), _SE(js_LoginRsp_set_roomId));

	cls->defineFinalizeFunction(_SE(js_LoginRsp_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsLoginRsp>(cls);

	__jsb_MatchVS_LoginRsp_proto = cls->getProto();
	__jsb_MatchVS_LoginRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_JoinOverRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_JoinOverRsp_class = nullptr;

static bool js_JoinOverRsp_finalize(se::State& s)
{
	matchvs::MsRoomJoinOverRsp *cobj = (matchvs::MsRoomJoinOverRsp *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_JoinOverRsp_finalize)

static bool js_JoinOverRsp_constructor(se::State& s)
{
	matchvs::MsRoomJoinOverRsp *cobj = new matchvs::MsRoomJoinOverRsp();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_JoinOverRsp_constructor, __jsb_MatchVS_JoinOverRsp_class, js_JoinOverRsp_finalize)

static bool js_JoinOverRsp_get_status(se::State& s)
{
	matchvs::MsRoomJoinOverRsp* cobj = (matchvs::MsRoomJoinOverRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_JoinOverRsp_get_status)

static bool js_JoinOverRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomJoinOverRsp* cobj = (matchvs::MsRoomJoinOverRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOverRsp_set_status)

static bool js_JoinOverRsp_get_cpProto(se::State& s)
{
	matchvs::MsRoomJoinOverRsp* cobj = (matchvs::MsRoomJoinOverRsp*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_JoinOverRsp_get_cpProto)

static bool js_JoinOverRsp_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomJoinOverRsp* cobj = (matchvs::MsRoomJoinOverRsp*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOverRsp_set_cpProto)

static bool js_register_matchvs_join_over_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("JoinOverRsp", ns, nullptr, _SE(js_JoinOverRsp_constructor));

	cls->defineProperty("status", _SE(js_JoinOverRsp_get_status), _SE(js_JoinOverRsp_set_status));
	cls->defineProperty("cpProto", _SE(js_JoinOverRsp_get_cpProto), _SE(js_JoinOverRsp_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_JoinOverRsp_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsRoomJoinOverRsp>(cls);

	__jsb_MatchVS_JoinOverRsp_proto = cls->getProto();
	__jsb_MatchVS_JoinOverRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_JoinOverNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_JoinOverNotify_class = nullptr;

static bool js_JoinOverNotify_finalize(se::State& s)
{
	auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_JoinOverNotify_finalize)

static bool js_JoinOverNotify_constructor(se::State& s)
{
	auto cobj = new matchvs::MsJoinOverNotifyInfo;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_JoinOverNotify_constructor, __jsb_MatchVS_JoinOverRsp_class, js_JoinOverNotify_finalize)

static bool js_JoinOverNotify_get_roomId(se::State& s)
{
	auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomId;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_JoinOverNotify_get_roomId)

static bool js_JoinOverNotify_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.nativeThisObject();
		cobj->roomId = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOverNotify_set_roomId)

static bool js_JoinOverNotify_get_srcUserId(se::State& s)
{
	auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_JoinOverNotify_get_srcUserId)

static bool js_JoinOverNotify_set_srcUserId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOverNotify_set_srcUserId)

static bool js_JoinOverNotify_get_cpProto(se::State& s)
{
	auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_JoinOverNotify_get_cpProto)

static bool js_JoinOverNotify_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsJoinOverNotifyInfo *)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOverNotify_set_cpProto)

static bool js_register_matchvs_join_over_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("JoinOverNotify", ns, nullptr, _SE(js_JoinOverNotify_constructor));

	cls->defineProperty("roomID", _SE(js_JoinOverNotify_get_roomId), _SE(js_JoinOverNotify_set_roomId));
	cls->defineProperty("srcUserId", _SE(js_JoinOverNotify_get_srcUserId), _SE(js_JoinOverNotify_set_srcUserId));
	cls->defineProperty("srcUserID", _SE(js_JoinOverNotify_get_srcUserId), _SE(js_JoinOverNotify_set_srcUserId));
	cls->defineProperty("cpProto", _SE(js_JoinOverNotify_get_cpProto), _SE(js_JoinOverNotify_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_JoinOverNotify_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsJoinOverNotifyInfo>(cls);

	__jsb_MatchVS_JoinOverNotify_proto = cls->getProto();
	__jsb_MatchVS_JoinOverNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_JoinOpenRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_JoinOpenRsp_class = nullptr;

static bool js_JoinOpenRsp_finalize(se::State& s)
{
	matchvs::MsJoinOpenRsp *cobj = (matchvs::MsJoinOpenRsp *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_JoinOpenRsp_finalize)

static bool js_JoinOpenRsp_constructor(se::State& s)
{
	matchvs::MsJoinOpenRsp *cobj = new matchvs::MsJoinOpenRsp();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_JoinOpenRsp_constructor, __jsb_MatchVS_JoinOpenRsp_class, js_JoinOpenRsp_finalize)

static bool js_JoinOpenRsp_get_status(se::State& s)
{
	matchvs::MsJoinOpenRsp* cobj = (matchvs::MsJoinOpenRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_JoinOpenRsp_get_status)

static bool js_JoinOpenRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsJoinOpenRsp* cobj = (matchvs::MsJoinOpenRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOpenRsp_set_status)

static bool js_JoinOpenRsp_get_cpProto(se::State& s)
{
	matchvs::MsJoinOpenRsp* cobj = (matchvs::MsJoinOpenRsp*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_JoinOpenRsp_get_cpProto)

static bool js_JoinOpenRsp_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsJoinOpenRsp* cobj = (matchvs::MsJoinOpenRsp*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOpenRsp_set_cpProto)

static bool js_register_matchvs_join_open_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("JoinOpenRsp", ns, nullptr, _SE(js_JoinOpenRsp_constructor));

	cls->defineProperty("status", _SE(js_JoinOpenRsp_get_status), _SE(js_JoinOpenRsp_set_status));
	cls->defineProperty("cpProto", _SE(js_JoinOpenRsp_get_cpProto), _SE(js_JoinOpenRsp_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_JoinOpenRsp_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsJoinOpenRsp>(cls);

	__jsb_MatchVS_JoinOpenRsp_proto = cls->getProto();
	__jsb_MatchVS_JoinOpenRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_JoinOpenNotify_proto = nullptr;
static se::Class  *__jsb_MatchVS_JoinOpenNotify_class = nullptr;

static bool js_JoinOpenNotify_finalize(se::State& s)
{
	auto cobj = (matchvs::MsJoinOpenNotify *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_JoinOpenNotify_finalize)

static bool js_JoinOpenNotify_constructor(se::State& s)
{
	auto cobj = new matchvs::MsJoinOpenNotify;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_JoinOpenNotify_constructor, __jsb_MatchVS_JoinOpenNotify_class, js_JoinOpenNotify_finalize)

static bool js_JoinOpenNotify_get_roomId(se::State& s)
{
	auto cobj = (matchvs::MsJoinOpenNotify *)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomId;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_JoinOpenNotify_get_roomId)

static bool js_JoinOpenNotify_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsJoinOpenNotify *)s.nativeThisObject();
		cobj->roomId = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOpenNotify_set_roomId)

static bool js_JoinOpenNotify_get_srcUserId(se::State& s)
{
	auto cobj = (matchvs::MsJoinOpenNotify *)s.nativeThisObject();
	s.rval().setUint32(cobj->srcUserID);
	return true;
}
SE_BIND_PROP_GET(js_JoinOpenNotify_get_srcUserId)

static bool js_JoinOpenNotify_set_srcUserId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsJoinOpenNotify *)s.nativeThisObject();
		cobj->srcUserID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOpenNotify_set_srcUserId)

static bool js_JoinOpenNotify_get_cpProto(se::State& s)
{
	auto cobj = (matchvs::MsJoinOpenNotify *)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_JoinOpenNotify_get_cpProto)

static bool js_JoinOpenNotify_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsJoinOpenNotify *)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_JoinOpenNotify_set_cpProto)

static bool js_register_matchvs_join_open_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("JoinOpenNotify", ns, nullptr, _SE(js_JoinOpenNotify_constructor));

	cls->defineProperty("roomID", _SE(js_JoinOpenNotify_get_roomId), _SE(js_JoinOpenNotify_set_roomId));
	cls->defineProperty("srcUserId", _SE(js_JoinOpenNotify_get_srcUserId), _SE(js_JoinOpenNotify_set_srcUserId));
	cls->defineProperty("srcUserID", _SE(js_JoinOpenNotify_get_srcUserId), _SE(js_JoinOpenNotify_set_srcUserId));
	cls->defineProperty("cpProto", _SE(js_JoinOpenNotify_get_cpProto), _SE(js_JoinOpenNotify_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_JoinOpenNotify_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsJoinOpenNotify>(cls);

	__jsb_MatchVS_JoinOpenNotify_proto = cls->getProto();
	__jsb_MatchVS_JoinOpenNotify_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_LeaveRoomRsp_proto = nullptr;
static se::Class  *__jsb_MatchVS_LeaveRoomRsp_class = nullptr;

static bool js_LeaveRoomRsp_finalize(se::State& s)
{
	matchvs::MsRoomLeaveRsp *cobj = (matchvs::MsRoomLeaveRsp *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_LeaveRoomRsp_finalize)

static bool js_LeaveRoomRsp_constructor(se::State& s)
{
	matchvs::MsRoomLeaveRsp *cobj = new matchvs::MsRoomLeaveRsp();
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_LeaveRoomRsp_constructor, __jsb_MatchVS_LeaveRoomRsp_class, js_LeaveRoomRsp_finalize)

static bool js_LeaveRoomRsp_get_status(se::State& s)
{
	matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
	s.rval().setInt32(cobj->status);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomRsp_get_status)

static bool js_LeaveRoomRsp_set_status(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
		cobj->status = args[0].toInt32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomRsp_set_status)

static bool js_LeaveRoomRsp_get_roomId(se::State& s)
{
	matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
	char buffer[64];
	sprintf(buffer, "%llu", cobj->roomID);
	s.rval().setString(buffer);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomRsp_get_roomId)

static bool js_LeaveRoomRsp_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
		cobj->roomID = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomRsp_set_roomId)

static bool js_LeaveRoomRsp_get_userId(se::State& s)
{
	matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomRsp_get_userId)

static bool js_LeaveRoomRsp_set_userId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomRsp_set_userId)

static bool js_LeaveRoomRsp_get_cpProto(se::State& s)
{
	matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomRsp_get_cpProto)

static bool js_LeaveRoomRsp_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		matchvs::MsRoomLeaveRsp* cobj = (matchvs::MsRoomLeaveRsp*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomRsp_set_cpProto)

static bool js_register_matchvs_leave_room_rsp(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("LeaveRoomRsp", ns, nullptr, _SE(js_LeaveRoomRsp_constructor));

	cls->defineProperty("status", _SE(js_LeaveRoomRsp_get_status), _SE(js_LeaveRoomRsp_set_status));
	cls->defineProperty("roomID", _SE(js_LeaveRoomRsp_get_roomId), _SE(js_LeaveRoomRsp_set_roomId));
	cls->defineProperty("userId", _SE(js_LeaveRoomRsp_get_userId), _SE(js_LeaveRoomRsp_set_userId));
	cls->defineProperty("userID", _SE(js_LeaveRoomRsp_get_userId), _SE(js_LeaveRoomRsp_set_userId));
	cls->defineProperty("cpProto", _SE(js_LeaveRoomRsp_get_cpProto), _SE(js_LeaveRoomRsp_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_LeaveRoomRsp_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsRoomLeaveRsp>(cls);

	__jsb_MatchVS_LeaveRoomRsp_proto = cls->getProto();
	__jsb_MatchVS_LeaveRoomRsp_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

static se::Object *__jsb_MatchVS_LeaveRoomNotifyInfo_proto = nullptr;
static se::Class  *__jsb_MatchVS_LeaveRoomNotifyInfo_class = nullptr;

static bool js_LeaveRoomNotifyInfo_finalize(se::State& s)
{
	auto cobj = (matchvs::MsLeaveRoomNotifyInfo *)s.thisObject()->getPrivateData();
	delete cobj;
	return true;
}
SE_BIND_FINALIZE_FUNC(js_LeaveRoomNotifyInfo_finalize)

static bool js_LeaveRoomNotifyInfo_constructor(se::State& s)
{
	auto cobj = new matchvs::MsLeaveRoomNotifyInfo;
	s.thisObject()->setPrivateData(cobj);
	return true;
}
SE_BIND_CTOR(js_LeaveRoomNotifyInfo_constructor, __jsb_MatchVS_LeaveRoomNotifyInfo_class, js_LeaveRoomNotifyInfo_finalize)

static bool js_LeaveRoomNotifyInfo_get_roomId(se::State& s)
{
	auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
	ostringstream oss;
	oss << cobj->roomId;
	s.rval().setString(oss.str());
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomNotifyInfo_get_roomId)

static bool js_LeaveRoomNotifyInfo_set_roomId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
		cobj->roomId = atoll(args[0].toString().c_str());
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomNotifyInfo_set_roomId)

static bool js_LeaveRoomNotifyInfo_get_userId(se::State& s)
{
	auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->userId);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomNotifyInfo_get_userId)

static bool js_LeaveRoomNotifyInfo_set_userId(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
		cobj->userId = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomNotifyInfo_set_userId)

static bool js_LeaveRoomNotifyInfo_get_userID(se::State& s)
{
	auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->userID);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomNotifyInfo_get_userID)

static bool js_LeaveRoomNotifyInfo_set_userID(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
		cobj->userID = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomNotifyInfo_set_userID)

static bool js_LeaveRoomNotifyInfo_get_owner(se::State& s)
{
	auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
	s.rval().setUint32(cobj->owner);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomNotifyInfo_get_owner)

static bool js_LeaveRoomNotifyInfo_set_owner(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
		cobj->owner = args[0].toUint32();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomNotifyInfo_set_owner)

static bool js_LeaveRoomNotifyInfo_get_cpProto(se::State& s)
{
	auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
	std::string cpProto(cobj->cpProto.c_str(), cobj->cpProto.length());
	s.rval().setString(cpProto);
	return true;
}
SE_BIND_PROP_GET(js_LeaveRoomNotifyInfo_get_cpProto)

static bool js_LeaveRoomNotifyInfo_set_cpProto(se::State& s)
{
	const auto& args = s.args();
	int argc = (int)args.size();
	if (argc == 1) {
		auto cobj = (matchvs::MsLeaveRoomNotifyInfo*)s.nativeThisObject();
		cobj->cpProto = args[0].toString();
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", argc, 1);
	return false;
}
SE_BIND_PROP_SET(js_LeaveRoomNotifyInfo_set_cpProto)

static bool js_register_matchvs_leave_room_notify(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("LeaveRoomNotifyInfo", ns, nullptr, _SE(js_LeaveRoomNotifyInfo_constructor));

	cls->defineProperty("roomID", _SE(js_LeaveRoomNotifyInfo_get_roomId), _SE(js_LeaveRoomNotifyInfo_set_roomId));
	cls->defineProperty("userId", _SE(js_LeaveRoomNotifyInfo_get_userId), _SE(js_LeaveRoomNotifyInfo_set_userId));
	cls->defineProperty("userID", _SE(js_LeaveRoomNotifyInfo_get_userID), _SE(js_LeaveRoomNotifyInfo_set_userID));
	cls->defineProperty("owner", _SE(js_LeaveRoomNotifyInfo_get_owner), _SE(js_LeaveRoomNotifyInfo_set_owner));
	cls->defineProperty("cpProto", _SE(js_LeaveRoomNotifyInfo_get_cpProto), _SE(js_LeaveRoomNotifyInfo_set_cpProto));

	cls->defineFinalizeFunction(_SE(js_LeaveRoomNotifyInfo_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MsLeaveRoomNotifyInfo>(cls);

	__jsb_MatchVS_LeaveRoomNotifyInfo_proto = cls->getProto();
	__jsb_MatchVS_LeaveRoomNotifyInfo_class = cls;

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

class Listener
{
public:
	std::function<void(const MsUserInfo &)>				onRegisterUserResponse;

	std::function<void(const MsLoginRsp &)>				onLoginResponse;
	std::function<void(const MsRoomJoinRsp &)>			onReconnectResponse;
	std::function<void(int32_t)>						onLogoutResponse;

	std::function<void(const MsCreateRoomRsp &)>		onCreateRoomResponse;
	std::function<void(const MsRoomListRsp &)>			onGetRoomListResponse;
	std::function<void(const MsGetRoomListExRsp &)>		onGetRoomListExResponse;

	std::function<void(const MsGetRoomDetailRsp &)>		onGetRoomDetailResponse;

	std::function<void(const MsSetRoomPropertiesRsp &)>	onSetRoomPropertiesResponse;
	std::function<void(const MsSetRoomPropertiesNotify &)>	onSetRoomPropertiesNotify;

	std::function<void(const MsRoomJoinRsp &)>			onJoinRoomResponse;
	std::function<void(const MsRoomUserInfo &)>			onJoinRoomNotify;

	std::function<void(const MsRoomJoinOverRsp &)>		onJoinOverResponse;
	std::function<void(const MsJoinOverNotifyInfo &)>	onJoinOverNotify;

	std::function<void(const MsJoinOpenRsp &)>			onJoinOpenResponse;
	std::function<void(const MsJoinOpenNotify &)>		onJoinOpenNotify;

	std::function<void(const MsRoomLeaveRsp &)>			onLeaveRoomResponse;
	std::function<void(const MsLeaveRoomNotifyInfo &)>	onLeaveRoomNotify;

	std::function<void(const MsKickPlayerRsp &)>		onKickPlayerResponse;
	std::function<void(const MsKickPlayerNotify &)>		onKickPlayerNotify;

	std::function<void(const MsSendEventRsp &)>			onSendEventResponse;
	std::function<void(const MsSendEventNotify &)>		onSendEventNotify;
	std::function<void(const MsGameServerNotifyInfo &)>	onGameServerNotify;

	std::function<void(const MsSubscribeEventGroupRsp &)>	onSubscribeEventGroupResponse;
	std::function<void(const MsSendEventGroupRsp &)>	onSendEventGroupResponse;
	std::function<void(const MsSendEventGroupNotify &)>	onSendEventGroupNotify;

	std::function<void(int32_t)>						onSetFrameSyncResponse;
	std::function<void(int32_t)>						onSendFrameEventResponse;
	std::function<void(const MsFrameData &)>			onFrameUdpate;

	std::function<void(int32_t)>						onNetworkDelay;
	std::function<void(const MsNetworkStateNotify &)>	onNetworkStateNotify;
	std::function<void(const char* const)>				onErrorResponse;
	std::function<void(int, const char* const)>			onErrorResponseEx;
};

class JsMatchVSResponse : public MatchVSResponse
{
public:
	int registerUserResponse(const MsUserInfo &userInfo)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onRegisterUserResponse) {
				listener.onRegisterUserResponse(userInfo);
			}
		});

		return 0;
	}

	int loginResponse(const MsLoginRsp &tRsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onLoginResponse) {
				listener.onLoginResponse(tRsp);
			}
		});

		return 0;
	}

	int reconnectResponse(const MsRoomJoinRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onReconnectResponse) {
				listener.onReconnectResponse(rsp);
			}
		});
		return 0;
	}

	int logoutResponse(const MsLogoutRsp &tRsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onLogoutResponse) {
				listener.onLogoutResponse(tRsp.status);
			}
		});

		return 0;
	}

	void createRoomResponse(const MsCreateRoomRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onCreateRoomResponse) {
				listener.onCreateRoomResponse(rsp);
			}
		});
	}

	void getRoomListResponse(const MsRoomListRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onGetRoomListResponse) {
				listener.onGetRoomListResponse(rsp);
			}
		});
	}

	void getRoomListExResponse(const MsGetRoomListExRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onGetRoomListExResponse) {
				listener.onGetRoomListExResponse(rsp);
			}
		});
	}

	void getRoomDetailResponse(const MsGetRoomDetailRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onGetRoomDetailResponse) {
				listener.onGetRoomDetailResponse(rsp);
			}
		});
	}

	int setRoomPropertiesResponse(const MsSetRoomPropertiesRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSetRoomPropertiesResponse) {
				listener.onSetRoomPropertiesResponse(rsp);
			}
		});
		return 0;
	}

	int setRoomPropertiesNotify(const MsSetRoomPropertiesNotify &notify)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSetRoomPropertiesNotify) {
				listener.onSetRoomPropertiesNotify(notify);
			}
		});
		return 0;
	}

	int roomJoinResponse(const MsRoomJoinRsp* tRsp)
	{
		MsRoomJoinRsp rsp = *tRsp;

		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onJoinRoomResponse) {
				listener.onJoinRoomResponse(rsp);
			}
		});

		return 0;
	}

	int roomPeerJoinNotify(const MsRoomUserInfo& userInfo)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onJoinRoomNotify) {
				listener.onJoinRoomNotify(userInfo);
			}
		});

		return 0;
	}

	int roomJoinOverResponse(const MsRoomJoinOverRsp* tRsp)
	{
		MsRoomJoinOverRsp rsp(*tRsp);

		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onJoinOverResponse) {
				listener.onJoinOverResponse(rsp);
			}
		});

		return 0;
	}

	void joinOverNotify(const MsJoinOverNotifyInfo &notifyInfo)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onJoinOverNotify) {
				listener.onJoinOverNotify(notifyInfo);
			}
		});
	}

	int joinOpenRsp(const MsJoinOpenRsp &data)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onJoinOpenResponse) {
				listener.onJoinOpenResponse(data);
			}
		});

		return 0;
	}

	int joinOpenNotify(const MsJoinOpenNotify &data)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onJoinOpenNotify) {
				listener.onJoinOpenNotify(data);
			}
		});

		return 0;
	}

	int roomLeaveResponse(const MsRoomLeaveRsp& tRsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onLeaveRoomResponse) {
				listener.onLeaveRoomResponse(tRsp);
			}
		});

		return 0;
	}

	int roomPeerLeaveNotify(const MsLeaveRoomNotifyInfo &notifyInfo)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onLeaveRoomNotify) {
				listener.onLeaveRoomNotify(notifyInfo);
			}
		});

		return 0;
	}

	void kickPlayerRsp(const MsKickPlayerRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onKickPlayerResponse) {
				listener.onKickPlayerResponse(rsp);
			}
		});
	}

	void kickPlayerNotify(const MsKickPlayerNotify &notify)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onKickPlayerNotify) {
				listener.onKickPlayerNotify(notify);
			}
		});
	}

	int sendEventRsp(const MsSendEventRsp &tRsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSendEventResponse) {
				listener.onSendEventResponse(tRsp);
			}
		});

		return 0;
	}

	void sendEventNotify(const MsSendEventNotify& tRsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSendEventNotify) {
				listener.onSendEventNotify(tRsp);
			}
		});
	}

	void gameServerNotify(const MsGameServerNotifyInfo &info)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onGameServerNotify) {
				listener.onGameServerNotify(info);
			}
		});
	}

	int errorResponse(const char* sError)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onErrorResponse) {
				listener.onErrorResponse(sError);
			}
		});
		return 0;
	}

	int errorResponseEx(int code, const char *text)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onErrorResponseEx) {
				listener.onErrorResponseEx(code, text);
			}
		});
		return 0;
	}

	int networkDelay(const int delay)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onNetworkDelay) {
				listener.onNetworkDelay(delay);
			}
		});

		return 0;
	}

	int networkStateNotify(const MsNetworkStateNotify &notify)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onNetworkStateNotify) {
				listener.onNetworkStateNotify(notify);
			}
		});

		return 0;
	}

	void subscribeEventGroupResponse(const MsSubscribeEventGroupRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSubscribeEventGroupResponse) {
				listener.onSubscribeEventGroupResponse(rsp);
			}
		});
	}

	void sendEventGroupResponse(const MsSendEventGroupRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSendEventGroupResponse) {
				listener.onSendEventGroupResponse(rsp);
			}
		});
	}

	void sendEventGroupNotify(const MsSendEventGroupNotify &notify)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSendEventGroupNotify) {
				listener.onSendEventGroupNotify(notify);
			}
		});
	}

	void setFrameSyncResponse(const MsSetChannelFrameSyncRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSetFrameSyncResponse) {
				listener.onSetFrameSyncResponse(rsp.status);
			}
		});
	}

	void sendFrameEventResponse(const MsSendFrameEventRsp &rsp)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onSendFrameEventResponse) {
				listener.onSendFrameEventResponse(rsp.status);
			}
		});
	}

	void frameUpdate(const MsFrameData &data)
	{
		Director::getInstance()->getScheduler()->performFunctionInCocosThread([=]() {
			if (NULL != listener.onFrameUdpate) {
				listener.onFrameUdpate(data);
			}
		});
	}

	Listener listener;
};

static JsMatchVSResponse* response = nullptr;

static se::Object* __jsb_MatchVS_MatchVSEngine_proto = nullptr;
static se::Class*  __jsb_MatchVS_MatchVSEngine_class = nullptr;

static bool js_MatchVSEngine_finalize(se::State& s)
{
	return true;
}
SE_BIND_FINALIZE_FUNC(js_MatchVSEngine_finalize)

static bool js_MatchVSEngine_getVersion(se::State& s)
{
	s.rval().setString(matchvs::MatchVSEngine::getVersion());
	return true;
}
SE_BIND_FUNC(js_MatchVSEngine_getVersion)

static bool js_MatchVSEngine_getInstance(se::State& s)
{
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 0) {
		auto engine = matchvs::MatchVSEngine::getInstance();
		/*
		auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_MatchVSEngine_class);
		obj->setPrivateData(engine);
		s.rval().setObject(obj);
		*/
		se::Value instanceVal;
		native_ptr_to_seval<matchvs::MatchVSEngine>(engine, __jsb_MatchVS_MatchVSEngine_class, &instanceVal);
		instanceVal.toObject()->root();
		s.rval() = instanceVal;
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_getInstance)

static bool js_MatchVSEngine_init(se::State& s)
{
	CCLOG("js_MatchVSEngine_init");

	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 4) {
		se::Value thiz(args[0]);
		thiz.toObject()->root();

		response->listener.onRegisterUserResponse = [=](const MsUserInfo &userInfo) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("registerUserResponse", &func)) {
				auto userInfoObj = se::Object::createObjectWithClass(__jsb_MatchVS_UserInfo_class);
				matchvs::MsUserInfo *data = new matchvs::MsUserInfo(userInfo);
				userInfoObj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(userInfoObj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onLoginResponse = [=](const MsLoginRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("loginResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_LoginRsp_class);
				matchvs::MsLoginRsp *data = new matchvs::MsLoginRsp(rsp);
				obj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onReconnectResponse = [=](const MsRoomJoinRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("reconnectResponse", &func)) {
				auto userInfosObj = se::Object::createArrayObject(rsp.userInfo_v.size());
				for (size_t i = 0; i < rsp.userInfo_v.size(); ++i) {
					auto userInfObj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomUserInfo_class);
					matchvs::MsRoomUserInfo *userInfo = new matchvs::MsRoomUserInfo(rsp.userInfo_v[i]);
					userInfObj->setPrivateData(userInfo);
					userInfosObj->setArrayElement(i, se::Value(userInfObj));
				}

				auto roomInfoObj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomInfo_class);
				matchvs::MsRoomInfo *data = new matchvs::MsRoomInfo(rsp.roomInfo);
				roomInfoObj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(rsp.status));
				args.push_back(se::Value(userInfosObj));
				args.push_back(se::Value(roomInfoObj));
				args.push_back(se::Value(rsp.state));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onLogoutResponse = [=](int32_t status) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("logoutResponse", &func)) {
				se::ValueArray args;
				args.push_back(se::Value(status));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onCreateRoomResponse = [=](const MsCreateRoomRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("createRoomResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_CreateRoomRsp_class);
				matchvs::MsCreateRoomRsp *data = new matchvs::MsCreateRoomRsp(rsp);
				obj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onGetRoomListResponse = [=](const MsRoomListRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("getRoomListResponse", &func)) {
				se::ValueArray args;
				args.push_back(se::Value(rsp.status));

				if (!rsp.roomInfos.empty()) {
					auto objs = se::Object::createArrayObject(rsp.roomInfos.size());

					uint32_t index = 0;
					for (auto info : rsp.roomInfos) {
						auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomInfoEx_class);
						matchvs::MsRoomInfoEx *data = new matchvs::MsRoomInfoEx(info);
						obj->setPrivateData(data);
						objs->setArrayElement(index++, se::Value(obj));
					}

					args.push_back(se::Value(objs));
				}

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onGetRoomListExResponse = [=](const MsGetRoomListExRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("getRoomListExResponse", &func)) {
				se::ValueArray args;

				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_GetRoomListExRsp_class);
				auto data = new matchvs::MsGetRoomListExRsp(rsp);
				obj->setPrivateData(data);
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onGetRoomDetailResponse = [=](const MsGetRoomDetailRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("getRoomDetailResponse", &func)) {
				se::ValueArray args;

				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomDetail_class);
				matchvs::MsGetRoomDetailRsp *data = new matchvs::MsGetRoomDetailRsp(rsp);
				obj->setPrivateData(data);

				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSetRoomPropertiesResponse = [=](const MsSetRoomPropertiesRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("setRoomPropertyResponse", &func)) {
				se::ValueArray args;
				
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SetRoomPropertiesRsp_class);
				matchvs::MsSetRoomPropertiesRsp *data = new matchvs::MsSetRoomPropertiesRsp(rsp);
				obj->setPrivateData(data);

				args.push_back(se::Value(obj));
				
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSetRoomPropertiesNotify = [=](const MsSetRoomPropertiesNotify &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("setRoomPropertyNotify", &func)) {
				se::ValueArray args;

				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SetRoomPropertiesNotify_class);
				matchvs::MsSetRoomPropertiesNotify *data = new matchvs::MsSetRoomPropertiesNotify(rsp);
				obj->setPrivateData(data);

				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onJoinRoomResponse = [=](const MsRoomJoinRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("joinRoomResponse", &func)) {
				auto userInfosObj = se::Object::createArrayObject(rsp.userInfo_v.size());
				for (size_t i = 0; i < rsp.userInfo_v.size(); ++i) {
					auto userInfObj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomUserInfo_class);
					matchvs::MsRoomUserInfo *userInfo = new matchvs::MsRoomUserInfo(rsp.userInfo_v[i]);
					userInfObj->setPrivateData(userInfo);
					userInfosObj->setArrayElement(i, se::Value(userInfObj));
				}

				auto roomInfoObj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomInfo_class);
				matchvs::MsRoomInfo *data = new matchvs::MsRoomInfo(rsp.roomInfo);
				roomInfoObj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(rsp.status));
				args.push_back(se::Value(userInfosObj));
				args.push_back(se::Value(roomInfoObj));
				args.push_back(se::Value(rsp.state));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onJoinRoomNotify = [=](const MsRoomUserInfo &userInfo) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("joinRoomNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_RoomUserInfo_class);
				matchvs::MsRoomUserInfo *result = new matchvs::MsRoomUserInfo(userInfo);
				obj->setPrivateData(result);
				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onJoinOverResponse = [=](const MsRoomJoinOverRsp &joinOverRsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("joinOverResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_JoinOverRsp_class);
				matchvs::MsRoomJoinOverRsp *data = new matchvs::MsRoomJoinOverRsp(joinOverRsp);
				obj->setPrivateData(data);
				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onJoinOverNotify = [=](const MsJoinOverNotifyInfo &notifyInfo) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("joinOverNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_JoinOverNotify_class);
				auto data = new matchvs::MsJoinOverNotifyInfo(notifyInfo);
				obj->setPrivateData(data);
				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onJoinOpenResponse = [=](const MsJoinOpenRsp &notifyInfo) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("joinOpenResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_JoinOpenRsp_class);
				auto data = new matchvs::MsJoinOpenRsp(notifyInfo);
				obj->setPrivateData(data);
				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onJoinOpenNotify = [=](const MsJoinOpenNotify &notifyInfo) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("joinOpenNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_JoinOpenNotify_class);
				auto data = new matchvs::MsJoinOpenNotify(notifyInfo);
				obj->setPrivateData(data);
				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onLeaveRoomResponse = [=](const MsRoomLeaveRsp &leaveRoomRsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("leaveRoomResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_LeaveRoomRsp_class);
				MsRoomLeaveRsp *data = new MsRoomLeaveRsp(leaveRoomRsp);
				obj->setPrivateData(data);
				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onLeaveRoomNotify = [=](const MsLeaveRoomNotifyInfo &notifyInfo) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("leaveRoomNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_LeaveRoomNotifyInfo_class);
				auto data = new MsLeaveRoomNotifyInfo(notifyInfo);
				obj->setPrivateData(data);

				se::ValueArray args;

				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onKickPlayerResponse = [=](const MsKickPlayerRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("kickPlayerResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_KickPlayerRsp_class);
				MsKickPlayerRsp *data = new MsKickPlayerRsp(rsp);
				obj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onKickPlayerNotify = [=](const MsKickPlayerNotify &notify) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("kickPlayerNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_KickPlayerNotify_class);
				MsKickPlayerNotify *data = new MsKickPlayerNotify(notify);
				obj->setPrivateData(data);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSendEventResponse = [=](const MsSendEventRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("sendEventResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SendEventRsp_class);
				matchvs::MsSendEventRsp *result = new matchvs::MsSendEventRsp(rsp);
				obj->setPrivateData(result);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSendEventNotify = [=](const MsSendEventNotify &notify) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("sendEventNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SendEventNotify_class);
				matchvs::MsSendEventNotify *result = new matchvs::MsSendEventNotify(notify);
				obj->setPrivateData(result);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onGameServerNotify = [=](const MsGameServerNotifyInfo &info) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("gameServerNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_GameServerNotify_class);
				matchvs::MsGameServerNotifyInfo *result = new matchvs::MsGameServerNotifyInfo(info);
				obj->setPrivateData(result);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSubscribeEventGroupResponse = [=](const MsSubscribeEventGroupRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("subscribeEventGroupResponse", &func)) {
				se::ValueArray args;
				args.push_back(se::Value(rsp.status));

				if (!rsp.groups.empty()) {
					uint32_t index = 0;
					auto groups = se::Object::createArrayObject(rsp.groups.size());
					for (auto group : rsp.groups) {
						std::string str(group.c_str(), group.length());
						groups->setArrayElement(index++, se::Value(str));
					}
					args.push_back(se::Value(groups));
				}

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSendEventGroupResponse = [=](const MsSendEventGroupRsp &rsp) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("sendEventGroupResponse", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SendEventGroupRsp_class);
				matchvs::MsSendEventGroupRsp *result = new matchvs::MsSendEventGroupRsp(rsp);
				obj->setPrivateData(result);

				se::ValueArray args;
				args.push_back(se::Value(obj));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSendEventGroupNotify = [=](const MsSendEventGroupNotify &notify) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("sendEventGroupNotify", &func)) {
				std::string cpProto(notify.cpProto.c_str(), notify.cpProto.length());
				se::ValueArray args;
				args.push_back(se::Value(notify.srcUserID));
				auto groups = se::Object::createArrayObject(notify.groups.size());
				if (!notify.groups.empty()) {
					uint32_t index = 0;
					for (auto group : notify.groups) {
						std::string str(group.c_str(), group.length());
						groups->setArrayElement(index++, se::Value(str));
					}
				}
				args.push_back(se::Value(groups));
				args.push_back(se::Value(cpProto));

				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onNetworkDelay = [=](int32_t delay) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("networkDelay", &func)) {
				se::ValueArray args;
				args.push_back(se::Value(delay));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onNetworkStateNotify = [=](const MsNetworkStateNotify &notify) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("networkStateNotify", &func)) {
				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_NetworkStateNotify_class);
				matchvs::MsNetworkStateNotify *result = new matchvs::MsNetworkStateNotify(notify);
				obj->setPrivateData(result);

				se::ValueArray args;
				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onErrorResponse = [=](const char* const error) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("errorResponse", &func)) {
				se::ValueArray args;
				args.push_back(se::Value(error));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onErrorResponseEx = [=](int code, const char* const error) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("errorResponseEx", &func)) {
				se::ValueArray args;
				args.push_back(se::Value(error));
				args.push_back(se::Value(error));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSetFrameSyncResponse = [=](int32_t status) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("setFrameSyncResponse", &func)) {
				se::ValueArray args;

				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SetFrameSyncRsp_class);
				auto result = new matchvs::MsSetChannelFrameSyncRsp;
				result->status = status;
				obj->setPrivateData(result);

				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onSendFrameEventResponse = [=](int status) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("sendFrameEventResponse", &func)) {
				se::ValueArray args;

				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SendFrameEventRsp_class);
				auto result = new matchvs::MsSendFrameEventRsp;
				result->status = status;
				obj->setPrivateData(result);

				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		response->listener.onFrameUdpate = [=](const MsFrameData &frameData) {
			se::ScriptEngine::getInstance()->clearException();
			se::AutoHandleScope hs;

			se::Value func;
			if (thiz.toObject()->getProperty("frameUdpate", &func)) {
				se::ValueArray args;

				auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_FrameData_class);
				auto data = new MsFrameData(frameData);
				obj->setPrivateData(data);

				args.push_back(se::Value(obj));
				func.toObject()->call(args, thiz.toObject());
			}
		};

		int ret = cobj->init(response, args[1].toString().c_str(), args[2].toString().c_str(), args[3].toUint32());
		s.rval().setInt32(ret);

		se::Value initResponse;
		if (thiz.toObject()->getProperty("initResponse", &initResponse)) {
			int status = 200;
			if (-1 == ret)
				status = 400;
			se::ValueArray args;
			args.push_back(se::Value(status));
			initResponse.toObject()->call(args, thiz.toObject());
		}
		return true;
	}

	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 4);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_init)

static bool js_MatchVSEngine_uninit(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 0) {
		int ret = cobj->uninit();
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_uninit)

static bool js_MatchVSEngine_registerUser(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 0) {
		int ret = cobj->registerUser();
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_registerUser)

static bool js_MatchVSEngine_login(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 8) {
		int ret = cobj->login(args[0].toInt32(), args[1].toString(), args[2].toInt32(), args[3].toInt32(),
			args[4].toString(), args[5].toString(), args[6].toString(), args[7].toInt32());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 8);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_login)

static bool js_MatchVSEngine_reconnect(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 0) {
		int ret = cobj->reconnect();
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 8);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_reconnect)

static bool js_MatchVSEngine_logout(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 0) {
		int ret = cobj->logout();
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 0);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_logout)

static bool js_MatchVSEngine_createRoom(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		MsCreateRoomInfo *createRoomInfo = (MsCreateRoomInfo *)args[0].toObject()->getPrivateData();
		if (NULL == createRoomInfo) {
			SE_REPORT_ERROR("wrong arguments 1");
			return false;
		}

		int ret = cobj->createRoom(*createRoomInfo, args[1].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_createRoom)

static bool js_MatchVSEngine_getRoomList(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		MsRoomFilter *filter = (MsRoomFilter *)args[0].toObject()->getPrivateData();
		if (NULL == filter) {
			SE_REPORT_ERROR("wrong arguments 1");
			return false;
		}

		int ret = cobj->getRoomList(*filter);
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_getRoomList)

static bool js_MatchVSEngine_getRoomListEx(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		auto filter = (MsRoomFilterEx *)args[0].toObject()->getPrivateData();
		if (NULL == filter) {
			SE_REPORT_ERROR("wrong arguments 1");
			return false;
		}

		int ret = cobj->getRoomListEx(*filter);
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_getRoomListEx)

static bool js_MatchVSEngine_getRoomDetail(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int ret = cobj->getRoomDetail(atoll(args[0].toString().c_str()));
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_getRoomDetail)

static bool js_MatchVSEngine_setRoomProperties(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		uint64_t roomID = atoll(args[0].toString().c_str());
		int ret = cobj->setRoomProperties(roomID, args[1].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_setRoomProperties)

static bool js_MatchVSEngine_joinRandomRoom(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		int ret = cobj->joinRandomRoom(args[0].toInt32(), args[1].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_joinRandomRoom)

static bool js_MatchVSEngine_joinRoomWithProperties(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		MsMatchInfo *matchInfo = (MsMatchInfo *)args[0].toObject()->getPrivateData();
		if (NULL == matchInfo) {
			SE_REPORT_ERROR("wrong argument 1");
			return false;
		}

		int ret = cobj->joinRoomWithProperties(*matchInfo, args[1].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_joinRoomWithProperties)

static bool js_MatchVSEngine_joinRoom(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		int ret = cobj->joinRoom(atoll(args[0].toString().c_str()), args[1].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_joinRoom)

static bool js_MatchVSEngine_joinOver(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int ret = cobj->joinOver(args[0].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_joinOver)

static bool js_MatchVSEngine_joinOpen(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int ret = cobj->joinOpen(args[0].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_joinOpen)

static bool js_MatchVSEngine_leaveRoom(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int ret = cobj->leaveRoom(args[0].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_leaveRoom)

static bool js_MatchVSEngine_kickPlayer(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		if (args[0].isUndefined()) {
			SE_REPORT_ERROR("userID undefined");
			return false;
		}
		int ret = cobj->kickPlayer(args[0].toUint32(), args[1].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_kickPlayer)

static bool js_MatchVSEngine_sendEvent(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int seq = 0;
		int ret = cobj->sendEvent(args[0].toString(), seq);
		auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SendEventResult_class);
		MsSendEventResult *result = new MsSendEventResult;
		result->setResult(ret);
		result->setSeq(seq);
		obj->setPrivateData(result);
		s.rval().setObject(obj);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_sendEvent)

static bool js_MatchVSEngine_sendEventEx(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 4) {
		int seq = 0;
		const uint32_t SIZE = 128;
		uint32_t userIds[SIZE] = { 0 };
		uint32_t size = 0;
		auto temp = args[3].toObject();
		temp->getArrayLength(&size);
		if (size > SIZE)
			size = SIZE;

		for (uint32_t index = 0; index < size; ++index) {
			se::Value data;
			temp->getArrayElement(index, &data);
			userIds[index] = data.toUint32();
		}

		int ret = cobj->sendEvent(args[0].toInt32(), args[1].toString(), args[2].toInt32(), size, userIds, seq);
		auto obj = se::Object::createObjectWithClass(__jsb_MatchVS_SendEventResult_class);
		MsSendEventResult *result = new MsSendEventResult;
		result->setResult(ret);
		result->setSeq(seq);
		obj->setPrivateData(result);
		s.rval().setObject(obj);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 4);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_sendEventEx)

static bool js_MatchVSEngine_subscribeEventGroup(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		std::vector<MsString> subscribe;
		std::vector<MsString> unsubscribe;

		uint32_t size = 0;
		auto obj = args[0].toObject();
		obj->getArrayLength(&size);
		for (uint32_t i = 0; i < size; ++i) {
			se::Value value;
			obj->getArrayElement(i, &value);
			subscribe.push_back(value.toString());
		}

		size = 0;
		obj = args[1].toObject();
		obj->getArrayLength(&size);
		for (uint32_t i = 0; i < size; ++i) {
			se::Value value;
			obj->getArrayElement(i, &value);
			unsubscribe.push_back(value.toString());
		}

		int ret = cobj->subscribeEventGroup(subscribe, unsubscribe);
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_subscribeEventGroup)

static bool js_MatchVSEngine_sendEventGroup(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 2) {
		std::vector<MsString> groups;

		uint32_t size = 0;
		auto obj = args[1].toObject();
		obj->getArrayLength(&size);
		for (uint32_t i = 0; i < size; ++i) {
			se::Value value;
			obj->getArrayElement(i, &value);
			groups.push_back(value.toString());
		}

		int ret = cobj->sendEventGroup(args[0].toString(), groups);
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 2);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_sendEventGroup)

static bool js_MatchVSEngine_setFrameSync(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int ret = cobj->setFrameSync(args[0].toInt32());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_setFrameSync)

static bool js_MatchVSEngine_sendFrameEvent(se::State& s)
{
	matchvs::MatchVSEngine *cobj = (matchvs::MatchVSEngine *)s.nativeThisObject();
	const auto& args = s.args();
	size_t argc = args.size();
	CC_UNUSED bool ok = true;
	if (argc == 1) {
		int ret = cobj->sendFrameEvent(args[0].toString());
		s.rval().setInt32(ret);
		return true;
	}
	SE_REPORT_ERROR("wrong number of arguments: %d, was expecting %d", (int)argc, 1);
	return false;
}
SE_BIND_FUNC(js_MatchVSEngine_sendFrameEvent)

bool js_register_matchvs_engine(se::Object* obj)
{
	se::Value nsVal;
	if (!obj->getProperty("Matchvs", &nsVal)) {
		se::HandleObject jsobj(se::Object::createPlainObject());
		nsVal.setObject(jsobj);
		obj->setProperty("Matchvs", nsVal);
	}
	se::Object* ns = nsVal.toObject();

	auto cls = se::Class::create("MatchvsEngine", ns, nullptr, nullptr);

	cls->defineFunction("init", _SE(js_MatchVSEngine_init));
	cls->defineFunction("uninit", _SE(js_MatchVSEngine_uninit));
	cls->defineFunction("registerUser", _SE(js_MatchVSEngine_registerUser));
	cls->defineFunction("login", _SE(js_MatchVSEngine_login));
	cls->defineFunction("reconnect", _SE(js_MatchVSEngine_reconnect));
	cls->defineFunction("logout", _SE(js_MatchVSEngine_logout));
	cls->defineFunction("createRoom", _SE(js_MatchVSEngine_createRoom));
	cls->defineFunction("getRoomList", _SE(js_MatchVSEngine_getRoomList));
	cls->defineFunction("getRoomListEx", _SE(js_MatchVSEngine_getRoomListEx));
	cls->defineFunction("getRoomDetail", _SE(js_MatchVSEngine_getRoomDetail));
	cls->defineFunction("setRoomProperty", _SE(js_MatchVSEngine_setRoomProperties));
	cls->defineFunction("joinRandomRoom", _SE(js_MatchVSEngine_joinRandomRoom));
	cls->defineFunction("joinRoomWithProperties", _SE(js_MatchVSEngine_joinRoomWithProperties));
	cls->defineFunction("joinRoom", _SE(js_MatchVSEngine_joinRoom));
	cls->defineFunction("joinOver", _SE(js_MatchVSEngine_joinOver));
	cls->defineFunction("joinOpen", _SE(js_MatchVSEngine_joinOpen));
	cls->defineFunction("leaveRoom", _SE(js_MatchVSEngine_leaveRoom));
	cls->defineFunction("kickPlayer", _SE(js_MatchVSEngine_kickPlayer));
	cls->defineFunction("sendEvent", _SE(js_MatchVSEngine_sendEvent));
	cls->defineFunction("sendEventEx", _SE(js_MatchVSEngine_sendEventEx));
	cls->defineFunction("subscribeEventGroup", _SE(js_MatchVSEngine_subscribeEventGroup));
	cls->defineFunction("sendEventGroup", _SE(js_MatchVSEngine_sendEventGroup));
	cls->defineFunction("setFrameSync", _SE(js_MatchVSEngine_setFrameSync));
	cls->defineFunction("sendFrameEvent", _SE(js_MatchVSEngine_sendFrameEvent));

	cls->defineFinalizeFunction(_SE(js_MatchVSEngine_finalize));

	cls->install();

	JSBClassType::registerClass<matchvs::MatchVSEngine>(cls);

	__jsb_MatchVS_MatchVSEngine_proto = cls->getProto();
	__jsb_MatchVS_MatchVSEngine_class = cls;

	se::Value ctorVal;
	if (ns->getProperty("MatchvsEngine", &ctorVal) && ctorVal.isObject()) {
		ctorVal.toObject()->defineFunction("getVersion", _SE(js_MatchVSEngine_getVersion));
		ctorVal.toObject()->defineFunction("getInstance", _SE(js_MatchVSEngine_getInstance));
	}

	se::ScriptEngine::getInstance()->clearException();

	return true;
}

bool register_all_matchvs_manual(se::Object* obj)
{
	CCLOG("register_all_matchvs_manual");

    response = new JsMatchVSResponse();

	js_register_matchvs_engine(obj);
	js_register_matchvs_user_info(obj);
	js_register_matchvs_login_rsp(obj);
	js_register_matchvs_room_user_info(obj);
	js_register_matchvs_room_info(obj);
	js_register_matchvs_join_over_rsp(obj);
	js_register_matchvs_join_over_notify(obj);
	js_register_matchvs_join_open_rsp(obj);
	js_register_matchvs_join_open_notify(obj);
	js_register_matchvs_leave_room_rsp(obj);
	js_register_matchvs_leave_room_notify(obj);
	js_register_matchvs_send_event_result(obj);
	js_register_matchvs_send_event_rsp(obj);
	js_register_matchvs_send_event_notify(obj);
	js_register_matchvs_game_server_notify(obj);
	js_register_matchvs_create_room_info(obj);
	js_register_matchvs_create_room_rsp(obj);
	js_register_matchvs_room_filter(obj);
	js_register_matchvs_room_info_ex(obj);
	js_register_matchvs_room_filter_ex(obj);
	js_register_matchvs_room_attribute(obj);
	js_register_matchvs_get_room_list_ex_rsp(obj);
	js_register_matchvs_match_info(obj);
	js_register_matchvs_kick_player_rsp(obj);
	js_register_matchvs_kick_player_notify(obj);
	js_register_matchvs_send_event_group_rsp(obj);
	js_register_matchvs_network_state_notify(obj);
	js_register_matchvs_set_frame_sync_rsp(obj);
	js_register_matchvs_send_frame_event_rsp(obj);
	js_register_matchvs_frame_item(obj);
	js_register_matchvs_frame_data(obj);
	js_register_matchvs_room_detail(obj);
	js_register_matchvs_set_room_properties_rsp(obj);
	js_register_matchvs_set_room_properties_notify(obj);

    se::ScriptEngine::getInstance()->addBeforeCleanupHook([&]() {
        delete response;
        response = nullptr;
    });

    return true;
}
