package expo.modules.devmenu.modules.internals

import android.content.Context
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import expo.modules.devmenu.modules.DevMenuInternalStorageModuleInterface

private const val DEV_MENU_STORE = "expo.modules.devmenu.store"

class DevMenuInternalStorageModule(reactContext: ReactApplicationContext)
  : DevMenuInternalStorageModuleInterface {
  private val localStore = reactContext.getSharedPreferences(DEV_MENU_STORE, Context.MODE_PRIVATE)

  override fun get(key: String): String? {
    return localStore.getString(key, null)
  }

  override fun getAsync(key: String, promise: Promise) {
    promise.resolve(get(key))
  }

  override fun saveAsync(key: String, data: String?, promise: Promise) {
    localStore
      .edit()
      .putString(key, data)
      .apply()

    promise.resolve(null)
  }
}
