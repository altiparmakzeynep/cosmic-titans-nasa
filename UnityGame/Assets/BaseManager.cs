using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using UnityEngine.SceneManagement;


public class BaseManager : MonoBehaviour,IAttackable
{
    public static BaseManager instance;

    public int generatorCount;

    public int batteryVolume;

    public int currentBattery;

    public int wave;

    public int money;

    public int health;

    public float heatDecreaseRate = 100f; // Azalma hýzýný ayarlayýn
    public float heatDecreaseRateinGame = 50f; // Azalma hýzýný ayarlayýn

    public float heatLevel;

    [SerializeField] Image currentBataryImage;
    
    [SerializeField] Text bataryText;

    [SerializeField] Text waveText;

    [SerializeField] Text moneyText, moneyTextInMenu;

    [SerializeField ]int remaningTime;

    [SerializeField] Image baseHealthBar;

     

    Vector3 scaleFactor;

   [SerializeField] bool totorial;

    float healthTimer;

    private void Start()
    {
        scaleFactor = transform.localScale;
        StartCoroutine(ElectricityGeneration());

    }

    private void Awake()
    {
        instance = this;
        
    }



    private void Update()
    {
        DecreaseHeatOverTime();

        bataryText.text = currentBattery.ToString() +" / "+batteryVolume +" kW/h";

        moneyText.text = money.ToString();
        moneyTextInMenu.text = money.ToString();
        if (!totorial)
        {
            baseHealthBar.fillAmount = heatLevel / 500.0f;

        }

        if (health < 500)
        {
            if (healthTimer < Time.time)
            {
                health+=5;
                healthTimer = Time.time + 1.5f;

            }


        }

        if (EnemySpawner.instance.startWave)
        {
            waveText.text = "Wave : " + wave.ToString();

        }
       

        currentBataryImage.fillAmount = (float)currentBattery / batteryVolume;

        if (heatLevel >= 1000)
        {
            heatLevel = 1000;
        }

        if (currentBattery>=5000)
        {
            AsyncOperation operation = SceneManager.LoadSceneAsync(3);


        }
        if (currentBattery >= batteryVolume)
        {
            currentBattery = batteryVolume;
        }

    }


    IEnumerator ElectricityGeneration()
    {

        yield return new WaitForSeconds(1);



        currentBattery += generatorCount;

        StartCoroutine(ElectricityGeneration());

    }

    public void Hit(int damage)
    {
        health -= damage;

        transform.DOShakeScale(0.2f, 0.2f, 16, 90, true).OnComplete(() =>

        {
            if (transform.localScale != scaleFactor)
            {
                transform.DOScale(scaleFactor, 0.05f);

            }

            if (health < 0)
            {
               
                AsyncOperation operation = SceneManager.LoadSceneAsync(2);
                Destroy(gameObject);
               

            }

        });
    }
    void DecreaseHeatOverTime()
    {
        heatLevel -= heatDecreaseRateinGame * Time.deltaTime;

        if (heatLevel <= 0)
        {
            // Oyuncu oyunu kaybeder veya baþka bir iþlem yapýlýr.
        }
    }
}
