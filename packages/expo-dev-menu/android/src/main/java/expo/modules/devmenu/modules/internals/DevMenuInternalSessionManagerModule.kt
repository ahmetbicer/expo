package expo.modules.devmenu.modules.internals

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import expo.modules.devmenu.modules.DevMenuInternalSessionManagerModuleInterface
import expo.modules.devmenu.modules.DevMenuInternalStorageModuleInterface
import expo.modules.devmenu.modules.DevMenuManagerProvider
import org.json.JSONObject

const val UserLoginEvent = "expo.dev-menu.user-login"
const val UserLogoutEvent = "expo.dev-menu.user-logout"

const val SessionKey = "expo-dev-menu.session"

class DevMenuInternalSessionManagerModule(
  private val reactContext: ReactApplicationContext,
  private val localStorage: DevMenuInternalStorageModuleInterface
) : DevMenuInternalSessionManagerModuleInterface {
  private val devMenuManger by lazy {
    reactContext
      .getNativeModule(DevMenuManagerProvider::class.java)
      .getDevMenuManager()
  }

  override fun restoreSession(): String? {
    val session = localStorage.get(SessionKey) ?: return null

    try {
      val json = JSONObject(session)
      if (json.has("sessionSecret")) {
        val sessionSecret = json.getString("sessionSecret")
        setSessionSecret(sessionSecret)
        return session
      }
    } catch (e: Exception) {
      Log.w("ExpoDevMenu", e.message, e)
    }

    setSessionSecret(null)
    return null
  }

  override fun restoreSessionAsync(promise: Promise) {
    promise.resolve(restoreSession())
  }

  override fun setSessionAsync(session: String?, sessionSecret: String?, promise: Promise) {
    if (session != null && !session.contains("sessionSecret")) {
      promise.reject("ERR_DEVMENU_CANNOT_SAVE_SESSION", "Session doesn't contain 'sessionSecret'.", null)
      return
    }

    setSessionSecret(sessionSecret)


    localStorage.saveAsync(SessionKey, session, promise)
  }

  private fun setSessionSecret(sessionSecret: String?) {
    val wasLogged = devMenuManger.getExpoApiClient().isLogged()
    devMenuManger.getExpoApiClient().setSessionSecret(sessionSecret)
    val isLogged = devMenuManger.getExpoApiClient().isLogged()

    val eventName = if (!wasLogged && isLogged) {
      UserLoginEvent
    } else if (wasLogged && !isLogged) {
      UserLogoutEvent
    } else {
      null
    }

    eventName?.let {
      devMenuManger.sendEventToDelegateBridge(it, null)
    }
  }
}
